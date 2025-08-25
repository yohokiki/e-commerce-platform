<script setup>
import { useCartStore } from '@/stores/cartStore'
import { getCheckInfoAPI, addNewAddressesAPI,commitOrderAPI } from '@/apis/checkout'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
const cartStore = useCartStore()

const curAddress = ref({})  // 地址对象
const checkInfo = ref({})  // 订单对象
const defualtCheck = ref({}) // 默认地址
const getCheckInfo = async () => {
  const res = await getCheckInfoAPI()
  checkInfo.value = res.result
  defualtCheck.value = checkInfo.value.userAddresses.find(item => item.isDefault === 0)
  console.log(checkInfo.value.goods)
}

onMounted(() => getCheckInfo())

// 控制切换地址弹窗
const toggleFlag = ref(false)

// 点击地址
const chooseAddresses = ref({})
const choose = (item) => {
  chooseAddresses.value = item
}

// 点击确认更换地址
const changeAddresses = () => {
  defualtCheck.value = chooseAddresses.value
  toggleFlag.value = false
}

// 提交订单
const router = useRouter()
const commitForm =async()=>{
  const res = await commitOrderAPI({
    deliveryTimeType:1,
    payType:1,
    payChannel:1,
    buyerMessage:'',
    goods:checkInfo.value.goods.map((item)=>{return {skuId:item.skuId,count:item.count}}),
    addressId:defualtCheck.value.id
  })
const orderId = res.result.id
router.push({
  path:'/pay',
  query:{
    id:orderId
  }
})

// 更新购物车
cartStore.updateNewList()
}


// 新增地址
const from = ref({
  receiver: '', //收货人姓名
  contact: '', //联系方式
  provinceCode: '',  //省份编码
  cityCode: '',  // 城市编码
  countyCode: '', // 地区编码
  address: '', // 详细地址
  postalCode: '',//邮政编码
  addressTags: '',//地址标签
  isDefault: 1,//是否默认，0是，1不是
  fullLocation: ''//完整地址
})
const rules = ref({
  receiver: [],
  contact: [],
  provinceCode: [],
  cityCode: [],
  countyCode: [],
  address: [],
  postalCode: [],
  addressTags: [],
  isDefault: [],
  fullLocation: []

})
const addFlag = ref(false)
const addAddresses = async() => {
//await addNewAddressesAPI(from.value)

}

</script>

<template>
  <div class="xtx-pay-checkout-page">
    <div class="container">
      <div class="wrapper">
        <!-- 收货地址 -->
        <h3 class="box-title">收货地址</h3>
        <div class="box-body">
          <div class="address">
            <div class="text">
              <div class="none" v-if="!defualtCheck">您需要先添加收货地址才可提交订单。</div>
              <ul v-else>
                <li><span>收<i />货<i />人：</span>{{ defualtCheck.receiver }}</li>
                <li><span>联系方式：</span>{{ defualtCheck.contact }}</li>
                <li><span>收货地址：</span>{{ defualtCheck.fullLocation }} {{ defualtCheck.address }}</li>
              </ul>
            </div>
            <div class="action">
              <el-button size="large" @click="toggleFlag = true">切换地址</el-button>
              <el-button size="large" @click="addFlag = true">添加地址</el-button>
            </div>
          </div>
        </div>
        <!-- 商品信息 -->
        <h3 class="box-title">商品信息</h3>
        <div class="box-body">
          <table class="goods">
            <thead>
              <tr>
                <th width="520">商品信息</th>
                <th width="170">单价</th>
                <th width="170">数量</th>
                <th width="170">小计</th>
                <th width="170">实付</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="i in checkInfo.goods" :key="i.id">
                <td>
                  <a href="javascript:;" class="info">
                    <img :src="i.picture" alt="">
                    <div class="right">
                      <p>{{ i.name }}</p>
                      <p>{{ i.attrsText }}</p>
                    </div>
                  </a>
                </td>
                <td>&yen;{{ i.price }}</td>
                <td>{{ i.price }}</td>
                <td>&yen;{{ i.totalPrice }}</td>
                <td>&yen;{{ i.totalPayPrice }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 配送时间 -->
        <h3 class="box-title">配送时间</h3>
        <div class="box-body">
          <a class="my-btn active" href="javascript:;">不限送货时间：周一至周日</a>
          <a class="my-btn" href="javascript:;">工作日送货：周一至周五</a>
          <a class="my-btn" href="javascript:;">双休日、假日送货：周六至周日</a>
        </div>
        <!-- 支付方式 -->
        <h3 class="box-title">支付方式</h3>
        <div class="box-body">
          <a class="my-btn active" href="javascript:;">在线支付</a>
          <a class="my-btn" href="javascript:;">货到付款</a>
          <span style="color:#999">货到付款需付5元手续费</span>
        </div>
        <!-- 金额明细 -->
        <h3 class="box-title">金额明细</h3>
        <div class="box-body">
          <div class="total">
            <dl>
              <dt>商品件数：</dt>
              <dd>{{ checkInfo.summary?.goodsCount }}件</dd>
            </dl>
            <dl>
              <dt>商品总价：</dt>
              <dd>¥{{ checkInfo.summary?.totalPrice.toFixed(2) }}</dd>
            </dl>
            <dl>
              <dt>运<i></i>费：</dt>
              <dd>¥{{ checkInfo.summary?.postFee.toFixed(2) }}</dd>
            </dl>
            <dl>
              <dt>应付总额：</dt>
              <dd class="price">{{ checkInfo.summary?.totalPayPrice.toFixed(2) }}</dd>
            </dl>
          </div>
        </div>
        <!-- 提交订单 -->
        <div class="submit">
          <el-button type="primary" size="large" @click="commitForm">提交订单</el-button>
        </div>
      </div>
    </div>
  </div>
  <!-- 切换地址 -->
  <el-dialog v-model="toggleFlag" title="切换收货地址" width="30%" center>
    <div class="addressWrapper">
      <div class="text item" :class="{ active: chooseAddresses.id === item.id }" v-for="item in checkInfo.userAddresses"
        :key="item.id" @click="choose(item)">
        <ul>
          <li><span>收<i />货<i />人：</span>{{ item.receiver }} </li>
          <li><span>联系方式：</span>{{ item.contact }}</li>
          <li><span>收货地址：</span>{{ item.fullLocation + item.address }}</li>
        </ul>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button>取消</el-button>
        <el-button type="primary" @click="changeAddresses">确定</el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 添加地址 -->
  <!-- <el-dialog v-model="addFlag" title="新增收货地址" width="30%" center>
    <div class="addressWrapper">
      <div class="form">
        <el-form ref="refData" :model="form" :rules="rules" label-position="right" label-width="60px" status-icon>
          <el-form-item prop="receiver" label="收货人姓名">
            <el-input v-model="form.receiver" />
          </el-form-item>
          <el-form-item prop="contact" label="联系方式">
            <el-input v-model="form.contact" />
          </el-form-item>
          <el-form-item prop="provinceCode" label="省份编码">
            <el-input v-model="form.provinceCode" />
          </el-form-item>
          <el-form-item prop="cityCode" label="城市编码">
            <el-input v-model="form.cityCode" />
          </el-form-item>
          <el-form-item prop="provinceCode" label="省份编码">
            <el-input v-model="form.provinceCode" />
          </el-form-item>
          <el-form-item prop="provinceCode" label="省份编码">
            <el-input v-model="form.provinceCode" />
          </el-form-item>
          <el-form-item prop="provinceCode" label="省份编码">
            <el-input v-model="form.provinceCode" />
          </el-form-item>
          <el-form-item prop="provinceCode" label="省份编码">
            <el-input v-model="form.provinceCode" />
          </el-form-item>
          <el-form-item prop="provinceCode" label="省份编码">
            <el-input v-model="form.provinceCode" />
          </el-form-item>
          <el-form-item prop="provinceCode" label="省份编码">
            <el-input v-model="form.provinceCode" />
          </el-form-item> 
          <el-button size="large" class="subBtn" @click="doLogin">确认</el-button>
        </el-form>
      </div>
    </div>
  </el-dialog>-->

</template>

<style scoped lang="scss">
@use "sass:color";

.xtx-pay-checkout-page {
  margin-top: 20px;

  .wrapper {
    background: #fff;
    padding: 0 20px;

    .box-title {
      font-size: 16px;
      font-weight: normal;
      padding-left: 10px;
      line-height: 70px;
      border-bottom: 1px solid #f5f5f5;
    }

    .box-body {
      padding: 20px 0;
    }
  }
}

.address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;

  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;

    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }

    >ul {
      flex: 1;
      padding: 20px;

      li {
        line-height: 30px;

        span {
          color: #999;
          margin-right: 5px;

          >i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }

    >a {
      color: $xtxColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }

  .action {
    width: 420px;
    text-align: center;

    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;

      &:first-child {
        margin-right: 10px;
      }
    }
  }
}

.goods {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;

  .info {
    display: flex;
    text-align: left;

    img {
      width: 70px;
      height: 70px;
      margin-right: 20px;
    }

    .right {
      line-height: 24px;

      p {
        &:last-child {
          color: #999;
        }
      }
    }
  }

  tr {
    th {
      background: #f5f5f5;
      font-weight: normal;
    }

    td,
    th {
      text-align: center;
      padding: 20px;
      border-bottom: 1px solid #f5f5f5;

      &:first-child {
        border-left: 1px solid #f5f5f5;
      }

      &:last-child {
        border-right: 1px solid #f5f5f5;
      }
    }
  }
}

.my-btn {
  width: 228px;
  height: 50px;
  border: 1px solid #e4e4e4;
  text-align: center;
  line-height: 48px;
  margin-right: 25px;
  color: #666666;
  display: inline-block;

  &.active,
  &:hover {
    border-color: $xtxColor;
  }
}

.total {
  dl {
    display: flex;
    justify-content: flex-end;
    line-height: 50px;

    dt {
      i {
        display: inline-block;
        width: 2em;
      }
    }

    dd {
      width: 240px;
      text-align: right;
      padding-right: 70px;

      &.price {
        font-size: 20px;
        color: $priceColor;
      }
    }
  }
}

.submit {
  text-align: right;
  padding: 60px;
  border-top: 1px solid #f5f5f5;
}

.addressWrapper {
  max-height: 500px;
  overflow-y: auto;
    .form {
    padding: 0 20px 20px 20px;

    &-item {
      margin-bottom: 28px;

      .input {
        position: relative;
        height: 36px;

        >i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }

        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;

          &.error {
            border-color: $priceColor;
          }

          &.active,
          &:focus {
            border-color: $xtxColor;
          }
        }

        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }

      >.error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: $priceColor;

        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }

    .agree {
      a {
        color: #069;
      }
    }

    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: $xtxColor;

      &.disabled {
        background: #cfcdcd;
      }
    }
  }
}

.text {
  flex: 1;
  min-height: 90px;
  display: flex;
  align-items: center;

  &.item {
    border: 1px solid #f5f5f5;
    margin-bottom: 10px;
    cursor: pointer;

    &.active,
    &:hover {
      border-color: $xtxColor;
      background: color.adjust($xtxColor, $lightness: 50%)
    }

    >ul {
      padding: 10px;
      font-size: 14px;
      line-height: 30px;
    }
  }
}
</style>