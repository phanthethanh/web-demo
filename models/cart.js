module.exports = function Cart(oldCart){
    this.items = oldCart.items || {};
    this.total_Qty = oldCart.total_Qty || 0;
    this.total_Price = oldCart.total_Price || 0;
    this.add = function(item, id){
        var stored_Item = this.items[id];
        if(!stored_Item){
            stored_Item = this.items[id] = {item: item, qty: 0, price: 0};
        }
        stored_Item.qty++;
        stored_Item.price = stored_Item.item.price * stored_Item.qty;
        this.total_Qty++;
        this.total_Price += parseInt(stored_Item.item.price);
    };

    this.generateArray = function(){
        var arr_items = [];
        for(var id in this.items){
            arr_items.push(this.items[id]);
        }
        return arr_items;
    };
};55