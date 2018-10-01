<template>
  <div class="login-window">
    <Card>
      <full-calendar :events="fcEvents" @changeMonth="cm" @dayClick="addplanByDay">
      </full-calendar>
      <Modal v-model="addplan.show" title="Add schedule..." @on-ok="submitplan">
        <Form :label-width="60" class="form-list">
          <FormItem label="Date:">
            <Input v-model="addplan.date" disabled> </Input>
          </FormItem>
          <FormItem label="Auitor:">
            <Select v-model="addplan.auditor">
                <Option v-for="item in addplan.auditorOption" :key="item.index" :value="item.code_id">{{item.info.name}}({{item.info.code}})(Layer:{{item.layer}})</Option>
              </Select>
          </FormItem>

          <FormItem label="Area:">
            <Select v-model="addplan.area" @on-change="getChecklist">
                <Option v-for="item in addplan.areaOption" :key="item.index" :value="item.id">{{item.area}}</Option>
              </Select>
          </FormItem>

          <FormItem label="Area:">
            <Select v-model="addplan.checklist">
                <Option v-for="item in addplan.checklistOption" :key="item.index" :value="item.id">{{item.name}}</Option>
              </Select>
          </FormItem>
        </Form>
      </Modal>
    </Card>
    <Data-table ref="cl" :source="tabledata" @children="change"></Data-table>
  </div>
</template>

<script>
  import DataTable from '../../tpl/DataTable.vue'
  export default {
    data() {
      return {
        tabledata: {},
        fcEvents: [{
          title: 'Sunny Out of Office',
          start: '2017-09-17',
          cssClass: 'undone',
        }],
        addplan: {
          show: false,
          auditor: '',
          date: '',
          area: '',
          checklist: '',
          auditorOption: [],
          areaOption: [],
          checklistOption: []
        }
      }
    },
    components: {
      DataTable
    },
    created() {
      this.$store.state.pageInfo.pageName = 'Layer Process Audit / Schedule Management';
      this.getAuditor();
      this.getArea();
      this.tabledata = this.$base.inidata('table');
      this.tabledata.url = 'getLPA/Plan/0';
      this.tabledata.title = 'LPA schedule';
      this.tabledata.columns = [{
          title: 'ID',
          key: 'id'
        },
        {
          title: 'Area',
          key: 'area',
          render: (h, params) => {
            return params.row.area.area;
          }
        },
        {
          title: 'Auditor',
          key: 'user',
          render: (h, params) => {
            return params.row.user.name;
          }
        },
        {
          title: 'Check list',
          key: 'checklist',
          render: (h, params) => {
            return params.row.checklist.name;
          }
        },
        {
          title: 'Plan Date',
          key: 'plan_date'
        },
        {
          title: 'Finish Date',
          key: 'finish_date'
        },
        {
          title: 'Action',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            if (params.row.status == 0) {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.delPlan(params.row.id);
                    }
                  }
                }, 'DELETE')
              ]);
            } else {
              return h('Tag', {
                props: {
                  type: 'dot',
                  color: 'green'
                }
              }, 'complete');
            }
          }

        }
      ];
      this.getPlanDataAll();
    },
    methods: {
      delPlan(id) {
        let that = this;
        let para = {
          url: 'getLPA/delPlan',
          type: 'POST',
          data: {
            id: id
          },
          sCallback: function(res) {
            that.getPlanDataAll();
          }
        }
        this.$base.http(para);
      },
      getAuditor() {
        let that = this;
        let para = {
          url: 'getLPA/user/0',
          params: {
            count: 100
          },
          sCallback: function(res) {
            that.addplan.auditorOption = res.data;
          }
        }
        this.$base.http(para);
      },
      getArea() {
        let that = this;
        let para = {
          url: 'getLPA/getActiveArea',
          sCallback: function(res) {
            that.addplan.areaOption = res;
          }
        }
        this.$base.http(para);
      },
      getChecklist(id) {
        this.addplan.checklist = '';
        let that = this;
        let para = {
          url: 'getLPA/getChecklistByArea/' + id,
          sCallback: function(res) {
            that.addplan.checklistOption = res.check_l_ist;
          }
        }
        this.$base.http(para);
      },
      submitplan() {
        let that = this;
        let para = {
          url: 'getLPA/addPlan',
          type: 'POST',
          data: {
            "auditor_id": this.addplan.auditor,
            "area_id": this.addplan.area,
            "checklist_id": this.addplan.checklist,
            "plan_date": this.addplan.date
          },
          sCallback: function(res) {
            that.addplan.auditor = '';
            that.addplan.area = '';
            that.addplan.checklist = '';
            that.getdata();
          }
        }
        this.$base.http(para);
      },
      addplanByDay(d, events) {
        console.log(d);
        this.addplan.date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
        this.addplan.show = true;

      },
      cm(start, end, current) {
        this.current = current;
        this.getdata();
      },
      getdata() {
        let that = this;
        let para = {
          url: 'getLPA/Plan/month',
          params: {
            month: this.current
          },
          sCallback: function(res) {
            that.fcEvents = [];
            for (let i = 0; i < res.length; i++) {
              let css = 'undone'
              if (res[i].status == '1') {
                css = 'done'
              }
              that.fcEvents.push({
                title: res[i].user.name + '--' + res[i].area.area,
                start: res[i].plan_date,
                cssClass: css
              })
            }

          }
        }
        this.$base.http(para);
      },
      change(page, count) {
        this.tabledata.current = page;
        this.tabledata.count = count;
        this.getPlanDataAll()
      },
      getPlanDataAll() {
        this.$base.iniTableData(this)
      },

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .undone {
    background: #f00 !important;
  }

  .events-day {
    height: 120px !important;
  }
</style>
