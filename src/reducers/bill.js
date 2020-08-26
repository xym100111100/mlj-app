import { MergeState } from '../utils/index';

const initState = {
  name: 'NSBill',
  // 账单
  bill: {},
  // 账单期数
  billPlan: [],
  // 账单详情
  billDetail: {},
  // 账单还款确认
  BillPayInfo: {},
  // 当前账单编号
  debtNo: "",
  billStatus: false,
};

export default (state = initState, action) => {
  const { type, value } = action;
  switch (type) {
    // 更新客户账单数据列表
    case 'UpdateBillList':
      return MergeState(state, { bill: value });
      break;
    // 更新客户账单还款计划
    case 'UpdateBillPlan':
      return MergeState(state, { billPlan: value });
      break;
    // 更新客户账单详情
    case 'UpdateBillDetail':
      return MergeState(state, { billDetail: value });
      break;
    // 更新客户账单还款确认信息
    case 'UpdateBillPayInfo':
      return MergeState(state, { BillPayInfo: value });
      break;
    // 更新当前账单编号
    case 'UpdateBillNum':
      return MergeState(state, { debtNo: value });
      break;
    case 'UpdateBillListStatus':
      return MergeState(state, { billStatus: true });
      break;
    case 'UpdateSelectItemStatus':
      return MergeState(state, { billStatus: false });
      break;
    // 合同签约确认
    case 'UpdateContractSign':
      return MergeState(state,
        {
          contractSign: value,
          completeStatus: true,
        },
      );
      break;
    default:
      return state;
      break;
  }
};
