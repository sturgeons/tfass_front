<template>
  <div class="login-window">
    <Row class="edit-header">
      <Col span="12">
      <Card>
        <div class="inner-card">
          <Row>
            <div class="observationsQuality" id="observationsQualtity"></div>
          </Row>
        </div>
      </Card>
      </Col>
      <Col span="12">
      <Card>
        <div class="inner-card">
          <Row>
            <div class="observationsQuality" id="planCount"></div>
          </Row>
        </div>
      </Card>
      </Col>
      <Col span="24">
      <Card>
        <div class="inner-card">
          <Row>
            <div class="observationsQuality" id="planPerson"></div>
          </Row>
        </div>
      </Card>
      </Col>

    </Row>

  </div>
</template>

<script>
export default {
  data() {
    return {
      observations: {
        xAxis: [],
        serise: []
      },
      plan: {
        xAxis: [],
        serise: {
          done: [],
          undone: []
        }
      },
      planPerson: {
        xAxis: [],
        serise: {
          done: [],
          undone: [],
          spendDays: []
        }
      }
    }
  },
  components: {

  },
  created() {
    this.$store.state.pageInfo.pageName = 'Layer Process Audit / Dashboard';
    this.getObservations();
    this.getPlanCout();
    this.getPlanPerson();
  },
  mounted() {
    var that = this;
    window.onresize = function temp() {
      that.refresh();
      that.planrefresh();
      that.refreshPlanPerson();
    };

  },
  methods: {
    getPlanPerson() {
      let that = this;
      let para = {
        url: 'LPA/dashboard/getPersonEffective',
        sCallback: function(res) {
          let o = {};
          for (let i = 0; i < res.length; i++) {
            o[res[i].name] = {
              done: 0,
              undone: 0,
              spendDays:0
            };
          }
          for (let j = 0; j < res.length; j++) {
            if (res[j].status == 0) {
              o[res[j].name].undone = res[j].count;
            } else {
              o[res[j].name].done = res[j].count;
              o[res[j].name].spendDays = res[j].spendDays;
            }
          }
          for (let x in o) {
            that.planPerson.xAxis.push(x);
            that.planPerson.serise.done.push(o[x].done);
            that.planPerson.serise.undone.push(o[x].undone);
            that.planPerson.serise.spendDays.push(o[x].spendDays);
          }

          that.refreshPlanPerson();
        }
      }
      that.$base.http(para);
    },
    drawPlanPerson() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('planPerson'))
      // 绘制图表
      myChart.setOption({
        title: {
          text: 'Person performance'
        },
        tooltip: {},
        legend: {
          right: '5',
          data: ['done', 'undone', 'spendDays'],
          textStyle: {
            color: '#000',
            fontSize: 16
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          data: this.planPerson.xAxis,
          axisLabel: {
            interval: 0,
            rotate: -40
          }
        },
        yAxis: [{ type: 'value' }, { type: 'value' }],
        series: [{
          name: 'done',
          type: 'bar',
          stack: '总量',
          yAxisIndex: 0,
          label: {
            normal: {
              show: true,
            }
          },
          itemStyle: {
            normal: {
              color: '#4ad2ff'
            }
          },
          data: this.planPerson.serise.done
        }, {
          name: 'undone',
          type: 'bar',
          stack: '总量',
          yAxisIndex: 0,
          label: {
            normal: {
              show: true,
            }
          },
          data: this.planPerson.serise.undone
        }, {
          name: 'spendDays',
          type: 'line',
          stack: 'spendDays',
          yAxisIndex: 1,
          label: {
            normal: {
              show: true,
            }
          },
          data: this.planPerson.serise.spendDays
        }]
      });
      return myChart;
    },
    refreshPlanPerson() {
      var draw = this.drawPlanPerson();
      draw.resize(); //重绘，窗口大小改动时
    },


    getPlanCout() {
      let that = this;
      let para = {
        url: 'LPA/dashboard/getPlanCount',
        sCallback: function(res) {
          let o = {};
          for (let i = 0; i < res.length; i++) {
            o[res[i].date] = {
              done: 0,
              undone: 0
            };

          }
          for (let j = 0; j < res.length; j++) {
            if (res[j].status == 0) {
              o[res[j].date].undone = res[j].count;
            } else {
              o[res[j].date].done = res[j].count;
            }
          }
          for (let x in o) {
            that.plan.xAxis.push(x);
            that.plan.serise.done.push(o[x].done);
            that.plan.serise.undone.push(o[x].undone);
          }

          that.planrefresh();
        }
      }
      that.$base.http(para);
    },
    drawplan() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('planCount'))
      // 绘制图表
      myChart.setOption({
        title: {
          text: 'Audit plan quantitly'
        },
        tooltip: {},
        legend: {
          right: '5',
          data: ['done', 'undone'],
          textStyle: {
            color: '#000',
            fontSize: 16
          }
        },
        xAxis: {
          data: this.plan.xAxis
        },
        yAxis: {},
        series: [{
          name: 'done',
          type: 'bar',
          stack: '总量',
          label: {
            normal: {
              show: true,
            }
          },
          itemStyle: {
            normal: {
              color: '#4ad2ff'
            }
          },
          data: this.plan.serise.done
        }, {
          name: 'undone',
          type: 'bar',
          stack: '总量',
          label: {
            normal: {
              show: true,
            }
          },
          data: this.plan.serise.undone
        }]
      });
      return myChart;
    },
    planrefresh() {
      var draw = this.drawplan();
      draw.resize(); //重绘，窗口大小改动时
    },



    getObservations() {
      let that = this;
      let para = {
        url: 'LPA/dashboard/observations',
        sCallback: function(res) {
          that.observations.xAxis = that.$base.arrayIndex(res, 'date')
          that.observations.serise = that.$base.arrayIndex(res, 'count')
          that.refresh();
        }
      }
      that.$base.http(para);
    },
    refresh() {
      var drawLine = this.drawLine();
      drawLine.resize(); //重绘，窗口大小改动时

    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('observationsQualtity'))
      // 绘制图表
      myChart.setOption({
        title: {
          text: 'Observations quantitly'
        },
        tooltip: {},
        legend: {
          right: '5',
          data: ['Observations'],
          textStyle: {
            color: '#000',
            fontSize: 16
          }
        },
        xAxis: {
          data: this.observations.xAxis
        },
        yAxis: {},
        series: [{
          name: 'Observations',
          type: 'bar',
          label: {
            normal: {
              show: true,
            }
          },
          itemStyle: {
            normal: {
              color: '#4ad2ff'
            }
          },
          data: this.observations.serise
        }]
      });
      return myChart;

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.observationsQuality {
  widows: 100%;
  height: 500px;
}
</style>
