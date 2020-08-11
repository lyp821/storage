<template>
  <div class="home">
    <div class="returnMine">
      <img src="../../assets/icon/arrow-left.svg" alt="">
      <div>我的认证</div>
    </div>
    <div class="itemDisplay">
      <van-cell v-for="(item,index) in unit"
                :key="index"
                is-link @click="showPopup(item)">
        <div class="imgVan">
          <img v-if="item.status=='未认证'" src="../../assets/icon/identification-times.svg" alt="">
          <img v-if="item.status=='已认证'" src="../../assets/icon/identification-check.svg" alt="">
        </div>
        <div class="nameVan"><span>{{item.name}}</span></div>
        <div class="statusVan">{{item.status}}</div>
      </van-cell>
    </div>
    <van-popup v-model="show" round position="bottom" class="myPopup">
      <div class="popupTitle">
        <div class="titleImg">
          <img v-if="myClickObj.status=='未认证'" src="../../assets/icon/pdf.svg" alt="">
          <img v-if="myClickObj.status=='已认证'" src="../../assets/icon/pdfRed.svg" alt="">
        </div>
        <div class="titleContent"><span>{{myClickObj.name}}</span></div>
      </div>
      <a :href="myClickObj.dowloadUrl">
        <van-cell is-link class="goToConfig" v-if="myClickObj.status=='已认证'">
          <div class="configImg">
            <img src="../../assets/icon/download.svg" alt="">
          </div>
          <div class="config">下载我的证书</div>
        </van-cell>
      </a>
      <a :href="'http://cchl.skylarkly.com/namespaces/13/yet_another_workflow/flows/'+myClickObj.flowId+'/journeys/new'">
        <van-cell is-link class="goToConfig">
          <div class="configImg">
            <img src="../../assets/icon/identification-bothway.svg" alt="">
          </div>
          <div class="config">去认证</div>
        </van-cell>
      </a>
      <div @click="closePopup" class="closeBtn">取消</div>
    </van-popup>
  </div>
</template>

<script>
  import api from "@/api/api";
  export default {
    name: 'HelloWorld',
    data () {
      return {
        show: false,
        cellShowClass: 'cellNone',
        myClickObj:{name:'ONTAP Sales Professional',status:'未认证'},
        user_id:'',
        myData:[],
        unit:[]
      }
    },
    created() {
      api.getFormsResponsesAPI('8717').then(res=>{
        res.data.forEach(item=>{
          this.myData.push(item.mapped_values.flowId.value[0])
        })
        this.user_id=location.href.split('=')[1]
        this.myData.forEach(item=>{
          let myUnit={}
          api.getFlowName(item).then(res=>{
            myUnit.name=res.data.title
            myUnit.flowId=item
            api.getUserCredential(item,this.user_id).then(res=>{
              if (res.status===200 && res.data.length){
                if (res.data[res.data.length-1].status==="finished"){
                  //  已认证
                  myUnit.status='已认证'
                }else {
                  //  未认证
                  myUnit.status='未认证'
                }
                res.data[res.data.length-1].response.entries.forEach(index=>{
                  if (index.attachment){
                    myUnit.dowloadUrl=index.attachment.download_url
                  }
                })
                this.unit.push(myUnit)
              }
            })
          })
        })
      })
    },
    methods: {
      closePopup(){
        this.show = false;
      },
      showPopup(obj) {
        this.show = true;
        this.myClickObj=obj
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .home{
    background-color: rgba(0,0,0,0.08);
  }
  .returnMine{
    background-color: #FFFFFF;
    height: 50px;
    position: relative;
    img{
      position: absolute;
      width: 22px;
      height: 22px;
      left: 16px;
      top: 14px;
    }
    div{
      font-family: PingFangSC-Medium;
      font-size: 18px;
      color: #212121;
      letter-spacing: 0;
      text-align: center;
      line-height: 50px;
    }
  }
  .itemDisplay{
    margin-top: 10px;
    font-family: PingFangSC-Regular;
    color: #212121;
    font-size: 14px;
    .cellNone{
      display: none;
    }
    .cellShow{
      display: block;
    }
    .van-cell{
      height: 65px;
    }
    .van-icon-arrow{
      margin-top: 10px;
    }
    .van-cell__value{
      display: flex;
      justify-content: space-between;
      .imgVan{
        width: 7%;
        position: relative;
        img{
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
        }
      }
      .nameVan{
        width: 239px;
        height: 40px;
        position: relative;
        span{
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
        }
      }
      .statusVan{
        width: 15%;
        line-height: 45px;
      }
    }

  }
  .myPopup{
    background-color: #ebedf0;
    .popupTitle{
      height: 64px;
      display: flex;
      justify-content: flex-start;
      text-align: left;
      border-bottom: 1px solid #ebedf0;
      background-color: #FFFFFF;
      .titleImg{
        width: 32px;
        height: 32px;
        margin: 16px 12px 16px 15px;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .titleContent{
        width: 301px;
        height: 48px;
        margin-top: 8px;
        position: relative;
        span{
          font-family: PingFangSC-Regular;
          font-size: 16px;
          color: #212121;
          letter-spacing: 0;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
    .goToConfig{
      .van-cell__value{
        display: flex;
        .configImg{
          padding-top: 5px;
        }
        .config{
          font-family: PingFangSC-Regular;
          font-size: 16px;
          color: #212121;
          letter-spacing: 0;
          margin-left: 12px;
          line-height: 31px;
        }
      }
    }
    .closeBtn{
      width: 100%;
      height: 50px;
      font-family: PingFangSC-Medium;
      font-size: 16px;
      color: #212121;
      letter-spacing: 0;
      text-align: center;
      line-height: 50px;
      margin-top: 10px;
      background-color: #FFFFFF;
    }
  }
</style>
