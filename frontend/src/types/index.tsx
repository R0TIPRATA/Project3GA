export type Wishlist = {
    uuid: string
    listTitle: string
    listMessage: string | undefined
    campaignDate: string
    createdAt: string
    updatedAt: string
    WishlistItems: Item[]
}

export type Item = {
    uuid: string
    itemStatus: boolean
    accumulatedAmount: number
    itemName: string
    category: string
    brand: string
    price: number
    productUrl: string | undefined
    itemMessageContributor: string | undefined
    updatedAt: Date
    createdAt: Date
}

export type InputField = {
    label: string,
    name: string
}