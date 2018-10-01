<template>
  <div class="layout">
    <Card>
      <p slot="title" class="_card_title">
        {{source.title}}
      </p>
      <a href="#" slot="extra" @click.prevent="refresh">
        <Icon type="refresh"></Icon>
        REFRESH
      </a>
      <Table stripe  :data="source.data" :columns="source.columns">
      </Table>
      <Row type="flex" justify="space-between" style="margin-top:15px">
        <Col span="6">
        <Form :label-width="60" class="form-list">
          <FormItem label="Count：">
            <Select v-model="source.count" @on-change="changeCount" placement="top">
              <Option :value="10">10</Option>
              <Option :value="15">15</Option>
              <Option :value="20">20</Option>
              <Option :value="50">50</Option>
            </Select>
          </FormItem>
        </Form>
        </Col>
        <Col span="6">
        <div style="text-align: center;line-height:30px">
          Total:{{source.total}}
        </div>
        </Col>
        <Col span="3">
        </Col>
        <Col span="9">
        <Page class-name="Cpage" :total="source.total" :current="source.current" :page-size="source.count" @on-change="changePage" simple></Page>
        </Col>
      </Row>
    </Card>
    <Spin size="large" fix v-if="source.load"></Spin>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
    }
  },
  props: [
    "source"
  ],
  created() {

  },
  methods: {
    refresh() {
      this.$emit("children", this.source.current, this.source.count);
    },
    changePage(event) {
      this.$emit("children", event, this.source.count);
    },
    changeCount(event) {

      this.$emit("children", this.source.current, event);
    }
  }
}
</script>
<style scope>
._card_title {
  color: '#ff0'
}
</style>
