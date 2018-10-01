<template>
  <div class="login-window">
    <Row class="edit-header">
      <Col span="24">
      <Card>
        <div class="inner-card">
          <h3>Help</h3>
          <hr/>
          <Form :label-width="0" class="form-list">
            <FormItem>
              <p> You can view all Observations in here. If you want view finish checklist please click "eye" button, left on the table.</p>
            </FormItem>
          </Form>
        </div>
      </Card>
      </Col>
    </Row>
    <Data-table :source="getobservationlist" @children="listChangePage"></Data-table>

    <Card v-if="showFinishChecklist">

      <Card>
        <Row>
          <Col span="6">ID:{{getfinshichecklist.resdata.id}}</Col>
          <Col span="6">Auditor:{{getfinshichecklist.resdata.user.name}}</Col>
          <Col span="6">Area:{{getfinshichecklist.resdata.checklist.name}}</Col>
          <Col span="6">Plan time:{{getfinshichecklist.resdata.plan_date}}</Col>
          <Col span="6">Finish time:{{getfinshichecklist.resdata.finish_date}}</Col>
          <Col span="6">Use days:{{getfinshichecklist.resdata.spend_days}}</Col>
          <Col span="6">Change language:
          <i-switch v-model="lang" size="small" @on-change="changelang">
            <span slot="open">中</span>
            <span slot="close">EN</span>
          </i-switch>
          </Col>
          <Col span="6"><Button type="error" long @click="reaudit">Reaudit</Button></Col>
        </Row>
      </Card>
      <Data-table :source="getfinshichecklist" @children="finishChecklistChangePage"></Data-table>
    </Card>
  </div>
</template>

<script>
  import DataTable from '../../tpl/DataTable.vue'
  export default {
    data() {
      return {
        lang: true,
        getobservationlist: {},
        getfinshichecklist: {},
        showFinishChecklist: false,
      }
    },
    components: {
      DataTable
    },
    created() {
      this.$store.state.pageInfo.pageName = 'Layer Process Audit / Observations Management';
      this.getobservationlist = this.$base.inidata('table');
      this.getobservationlist.url = 'getLPA/question/0';
      this.getobservationlist.title = 'LPA observations';
      this.getobservationlist.columns = [{
          title: 'ID',
          key: 'id',
          width: 70
        },
        {
          title: 'Plan id',
          key: 'plan_id',
          width: 80
        }, {
          title: 'Observation',
          key: 'question',
        }, {
          title: 'Check point',
          key: 'checklist',
          render: (h, params) => {
            return params.row.check_point.checklist;
          }
        }, {
          title: 'Plan time',
          key: 'get_plan',
          render: (h, params) => {
            return params.row.get_plan.plan_date;
          },
          width: 100
        }, {
          title: 'Finish time',
          key: 'get_plan',
          render: (h, params) => {
            return params.row.get_plan.finish_date;
          },
          width: 100
        },
        {
          title: 'Action',
          key: 'active',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.viewFullChecklist(params.row.plan_id);
                  }
                }
              }, [h('Icon', {
                props: {
                  type: "eye"
                }
              })])
            ]);
          }
        }
      ];
      this.GETobservationlist();
      this.getfinshichecklist = this.$base.inidata('table');
      this.getfinshichecklist.title = 'Finish checklist';
      this.getfinshichecklist.columns = [{
          title: 'ID',
          key: 'id',
          width: 50
        },
        {
          title: 'Check point',
          key: 'point',
          render: (h, params) => {
            if (this.lang) {
              return params.row.point;
            }
            return params.row.point_en;
          },
          width: 120
        },
        {
          title: 'Check class',
          key: 'class',
           render: (h, params) => {
            if (this.lang) {
              return params.row.class;
            }
            return params.row.class_en;
          }
        },
        {
          title: 'Check context',
          key: 'checklist',
          render: (h, params) => {
            if (this.lang) {
              return params.row.checklist;
            }
            return params.row.checklist_en;
          }
        },
        {
          title: 'Check method',
          key: 'methods',
           render: (h, params) => {
            if (this.lang) {
              return params.row.methods;
            }
            return params.row.methods_en;
          }
        },
        {
          title: 'Observation',
          key: 'methods',
          render: (h, params) => {
            let data = this.getfinshichecklist.resdata.question;
            for (let i = 0; i < data.length; i++) {
              if (params.row.id == data[i].id) {
                return data[i].question;
              }
            }
          }
        }

      ];
      this.getfinshichecklist.resdata = {};
    },
    methods: {
      reaudit(){
        let id=this.getfinshichecklist.resdata.id;
        this.showFinishChecklist=false;
        var that=this;
        let para = {
          url: 'getLPA/reaudit/'+id,
          sCallback: function(res) {
           that.GETobservationlist();
          }
        };
        that.$base.http(para);

      },
      changelang(val) {
        console.log(val);
      },
      viewFullChecklist(id) {
        this.getfinshichecklist.url = 'getLPA/finishAudit/' + id;
        this.showFinishChecklist=false;
        var that = this;
        that.getfinshichecklist.load = true;
        let para = {
          url: this.getfinshichecklist.url,
          params: {
            page: that.getfinshichecklist.current,
            count: that.getfinshichecklist.count
          },
          sCallback: function(res) {
            that.getfinshichecklist.data = res.checklist_item;
            that.getfinshichecklist.resdata = res;
            that.getfinshichecklist.load = false;
            that.showFinishChecklist = true;
          }
        };
        that.$base.http(para);
      },
      finishChecklistChangePage() {},
      listChangePage(page, count) {
        this.getobservationlist.current = page;
        this.getobservationlist.count = count;
        this.GETobservationlist()
      },
      GETobservationlist() {
        var that = this;
        that.getobservationlist.load = true;
        let para = {
          url: this.getobservationlist.url,
          params: {
            page: that.getobservationlist.current,
            count: that.getobservationlist.count
          },
          sCallback: function(res) {
            that.getobservationlist.data = res.data;
            that.getobservationlist.total = res.total;
            that.getobservationlist.current = res.current_page;
            that.getobservationlist.load = false;
          }
        };
        that.$base.http(para);
      },
      updateInfo(id, val) {
        var that = this;
        let para = {
          'url': 'getLPA/updateChecklist',
          'type': 'POST',
          'data': {
            id: id,
            active: active
          },
          sCallback: function(res) {
            that.refresh();
          }
        };
        this.$base.http(para);
      }
    }
  }
</script>

<style scoped>
  .form-list {
    margin: 5px;
  }

  .edit-header {
    padding: 5px 0px 5px 0px;
  }

  .ivu-form-item {
    margin-bottom: 5px;
  }

  p {
    line-height: 20px;
  }
</style>
