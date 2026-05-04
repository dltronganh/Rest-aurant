export const languages = ["en", "vi"] as const;

export type Language = (typeof languages)[number];

export const translations = {
  brand: { en: "Rest-aurant", vi: "Nhà hàng" },
  navDrinks: { en: "Drinks", vi: "Đồ uống" },
  navOrders: { en: "Orders", vi: "Đơn hàng" },
  languageToggle: { en: "Tiếng Việt", vi: "English" },
  storeManager: { en: "Store Manager", vi: "Quản lý cửa hàng" },
  storeManagerDescription: {
    en: "Manage drink details and record orders from one local dashboard.",
    vi: "Quản lý đồ uống và ghi nhận đơn hàng từ một bảng điều khiển.",
  },
  manageDrinks: { en: "Manage Drinks", vi: "Quản lý đồ uống" },
  newOrder: { en: "New Order", vi: "Đơn mới" },
  todayWorkspace: { en: "Today's workspace", vi: "Không gian làm việc hôm nay" },
  todayWorkspaceDescription: {
    en: "Add drink items first, then use Orders to create unpaid orders and mark payment when complete.",
    vi: "Thêm đồ uống trước, sau đó tạo đơn chưa thanh toán và đánh dấu đã thanh toán khi hoàn tất.",
  },
  quickStats: { en: "Quick Stats", vi: "Thống kê nhanh" },
  drinksInCatalog: { en: "Drinks in catalog", vi: "Đồ uống trong danh mục" },
  unpaidOrders: { en: "Unpaid orders", vi: "Đơn chưa thanh toán" },
  recentOrderValue: { en: "Recent order value", vi: "Giá trị đơn gần đây" },
  drinksTitle: { en: "Drinks", vi: "Đồ uống" },
  drinksDescription: {
    en: "Add, update, and remove drinks for the store catalog.",
    vi: "Thêm, cập nhật và xóa đồ uống trong danh mục cửa hàng.",
  },
  addDrink: { en: "Add Drink", vi: "Thêm đồ uống" },
  editDrink: { en: "Edit Drink", vi: "Sửa đồ uống" },
  saveDrink: { en: "Save Drink", vi: "Lưu đồ uống" },
  cancel: { en: "Cancel", vi: "Hủy" },
  drinkCatalog: { en: "Drink Catalog", vi: "Danh mục đồ uống" },
  noDrinks: {
    en: "No drinks yet. Add your first drink to start taking orders.",
    vi: "Chưa có đồ uống. Thêm đồ uống đầu tiên để bắt đầu nhận đơn.",
  },
  name: { en: "Name", vi: "Tên" },
  description: { en: "Description", vi: "Mô tả" },
  price: { en: "Price", vi: "Giá" },
  image: { en: "Image", vi: "Hình ảnh" },
  imageKeepCurrent: {
    en: "Leave empty to keep current image.",
    vi: "Để trống nếu muốn giữ hình hiện tại.",
  },
  drink: { en: "Drink", vi: "Đồ uống" },
  actions: { en: "Actions", vi: "Thao tác" },
  edit: { en: "Edit", vi: "Sửa" },
  delete: { en: "Delete", vi: "Xóa" },
  ordersTitle: { en: "Orders", vi: "Đơn hàng" },
  ordersDescription: {
    en: "Create unpaid orders and mark payment when it is complete.",
    vi: "Tạo đơn chưa thanh toán và đánh dấu đã thanh toán khi hoàn tất.",
  },
  orderHistory: { en: "Order History", vi: "Lịch sử đơn hàng" },
  addDrinksBeforeOrder: {
    en: "Add drinks before creating an order.",
    vi: "Thêm đồ uống trước khi tạo đơn.",
  },
  quantity: { en: "Qty", vi: "SL" },
  total: { en: "Total", vi: "Tổng" },
  createUnpaidOrder: { en: "Create Unpaid Order", vi: "Tạo đơn chưa thanh toán" },
  noOrders: { en: "No orders yet.", vi: "Chưa có đơn hàng." },
  paid: { en: "Paid", vi: "Đã thanh toán" },
  unpaid: { en: "Unpaid", vi: "Chưa thanh toán" },
  paymentPending: { en: "Payment pending", vi: "Chờ thanh toán" },
  paidAt: { en: "Paid", vi: "Đã thanh toán" },
  at: { en: "at", vi: "giá" },
  markPaid: { en: "Mark Paid", vi: "Đánh dấu đã thanh toán" },
  deleteConfirm: { en: "Delete", vi: "Xóa" },
  imageUploadFailed: { en: "Image upload failed.", vi: "Tải hình ảnh thất bại." },
  unableSaveDrink: { en: "Unable to save drink.", vi: "Không thể lưu đồ uống." },
  unableDeleteDrink: { en: "Unable to delete drink.", vi: "Không thể xóa đồ uống." },
  unableCreateOrder: { en: "Unable to create order.", vi: "Không thể tạo đơn hàng." },
} as const;

export type TranslationKey = keyof typeof translations;
