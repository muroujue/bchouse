<template>
  <div class="games">
    <el-row :gutter="40">
      <el-col :lg="8" :xs="24">
        <div class="history">
          <h3>推荐奖励排行榜</h3>
          <div class="listBox" v-loading="loading">
            <el-table class="rewardTable" :data="rewardData">
              <el-table-column prop="sort" label="排名" width="52"></el-table-column>
              <el-table-column prop="user" label="玩家"></el-table-column>
              <el-table-column prop="amount" label="金额(ETH)" width="98"></el-table-column>
            </el-table>
          </div>
        </div>
      </el-col>
      <el-col :lg="8" :xs="24">
        <div class="history">
          <h3>24小时盈利排行</h3>
          <div class="listBox" v-loading="loading">
            <el-table class="rewardTable" :data="profitData">
              <el-table-column prop="sort" label="排名" width="52"></el-table-column>
              <el-table-column prop="user" label="玩家"></el-table-column>
              <el-table-column prop="amount" label="金额(ETH)" width="98"></el-table-column>
            </el-table>
          </div>
        </div>
      </el-col>
      <el-col :lg="8" :xs="24">
        <div class="history">
          <h3>24小时投注金额排行</h3>
          <div class="listBox" v-loading="loading">
            <el-table class="rewardTable" :data="amountData">
              <el-table-column prop="sort" label="排名" width="52"></el-table-column>
              <el-table-column prop="user" label="玩家"></el-table-column>
              <el-table-column prop="amount" label="金额(ETH)" width="98"></el-table-column>
            </el-table>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  components:{
  },
  data() {
    return {
      loading:false,
      rewardData:[
        {
          "sort":1,
          "user":'0x123456（zhangsan）',
          "amount":'19.12'
        },
        {
          "sort":2,
          "user":'0x123456（zhangsan）',
          "amount":'19.12'
        },
        {
          "sort":3,
          "user":'0x123456（zhangsan）',
          "amount":'19.12'
        }
      ],
      profitData:[
        {
          "sort":1,
          "user":'0x123456（zhangsan）',
          "amount":'19.12'
        },
        {
          "sort":2,
          "user":'0x123456（zhangsan）',
          "amount":'19.12'
        },
        {
          "sort":3,
          "user":'0x123456（zhangsan）',
          "amount":'19.12'
        }
      ],
      amountData:[
        {
          "sort":1,
          "user":'0x123456（zhangsan）',
          "amount":'19.12'
        },
        {
          "sort":2,
          "user":'0x123456（zhangsan）',
          "amount":'19.12'
        },
        {
          "sort":3,
          "user":'0x123456（zhangsan）',
          "amount":'19.12'
        }
      ]
    }
  },
  head () {
    return {
      title: this.$t('metaData.title'),
      meta:[
        { hid: 'description', name: 'description', content:this.$t('metaData.description') },
        { hid: 'keywords', name: 'keywords', content:this.$t('metaData.keywords') }
      ]
    }
  },
  computed:{
  },
  mounted(){
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
.history {
  width: 100%;
  background: rgba(64, 80, 99, 0.6);
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 16px;
  height: 680px;
  padding: 0 35px;
  box-shadow: 0 0 25px rgba(28, 35, 45, 0.7);
  position: relative;
  color: #fff;
  h3 {
    font-size: 22px;
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid #515962;
  }
  /deep/ .el-table{
    &:before{
      background: #515962;
    }
    color: rgba(255, 255, 255, 0.7);
    background: none;
    tr{
      background: none;
      &:hover{
        td{
          background: rgba(28, 35, 45, 0.7);
        }
      }
      td{
        border-bottom: none;
        padding:5px 0;
      }
    }
    .el-table__row{
      td:nth-child(2){
        div{
          white-space: nowrap;
        }
      }
    }
    .el-table__header-wrapper{
      thead{
        color: rgba(255, 255, 255, 0.7);
        background: none;
        tr{
          th{
            background: none;
            &.is-leaf{
              border-bottom: 1px solid #515962;
            }
          }
        }
      }
    }
  }
}
</style>