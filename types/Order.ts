type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "canceled";

interface Order {
    id: number;
    status: OrderStatus;
    shippingAddressId: number;
    shippingAddress: Address;
    billingAddressId: number;
    billingAddress: Address;
    userId: number;
    product: Product;
    productId: number;
    amount: number;
    amountDue: number;
    user: User;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
