/*
Copyright© Dexer_Matters
version : 0.0.1 alpha
date : unknown
|----\     |-----    \    /    |-----    |-----\
|     \    |          \  /     |         |      |
|      |   |-----      \/      |-----    |-----/
|      |   |           /\      |         |\_
|     /    |          /  \     |         |  \_
|----/     |-----    /    \    |-----    |    \_

*/

let itemIDs=["gum","rubber","plastics","nail","steel_tube","gear","aerogel","mechanical_parts","power_core","battery","microchip","microchip_I","microchip_II","pig_iron","black_iron","tin","copper","sliver","carbon","lead","lithium","aluminum","silicon","nickel","titanium","tungsten","cobalt","chromium","sulfur","steel","stainless_steel","cemented_carbide","gold_powder","iron_powder","black_iron_powder","tin_powder","copper_powder","sliver_powder","carbon_powder","lead_powder","lithium_powder","aluminum_powder","silicon_powder","nickel_powder","titanium_powder","tungsten_powder","cobalt_powder","chromium_powder","sulfur_powder","diamond_powder","gold_plate","iron_plate","tin_plate","steel_plate","copper_plate","carbon_plate","lead_plate","aluminum_plate","titanium_plate","hydrogen","nitrogen","helium","oxygen","carbon_dioxide","tube_empty","tube_water","tube_lava","tube_iron","tube_blood","tube_biomass"];

let itemNames=["树胶","橡胶","塑料","钉子","钢管","齿轮","气凝胶","机械部件","能量核心","电池","芯片","一阶处理器","二阶处理器","生铁锭","黑铁锭","锡锭","铜锭","银锭","碳锭","铅锭","锂锭","铝锭","硅锭","镍锭","钛锭","钨锭","钴锭","铬锭","硫晶体","钢","不锈钢","硬质合金","金粉","铁粉","黑铁粉","锡粉","铜粉","银粉","碳粉","铅粉","锂粉","铝粉","硅粉","镍粉","钛粉","钨粉","钴粉","铬粉","硫粉","钻石粉","金板","铁板","锡板","钢板","铜板","碳板","铅板","铝板","钛板","氢气","氮气","氦气","氧气","二氧化碳","空试管","试管(水)","试管(岩浆)","试管(铁)","试管(血)","试管(生物质)"];

let toolIDs=["spanner"];

let toolNames=["扳手"];

let mechiIDs=["mechanical_furnace","extractor","duster","compressor","ore_washer","mixer","gas_decomposer","moulding_machine","melting_machine"];

let mechiNames=["机械熔炉","提取机","打粉机","压缩机","洗矿机","搅拌机","气体分解机","塑型机","熔炼机"];

let blockIDs=["mechanical_housing","tin_block","copper_block","sliver_block","carbon_block","lead_block","lithium_block","aluminium_block","silicon_block","nickel_block","titanium_block","tungsten_block","cobalt_block","chromium_block","sulfur_block","tin_ore","copper_ore","sliver_ore","carbon_ore","lead_ore","lithium_ore","aluminium_ore","silicon_ore","nickel_ore","titanium_ore","tungsten_ore","cobalt_ore","chromium_ore","sulfur_ore"];

let blockNames=["机械外壳","锡块","铜块","银块","碳块","铅块","锂块","铝块","硅块","镍块","钛块","钨块","钴块","铬锭","硫块","锡矿","铜矿","银矿","碳矿","铅矿","锂矿","铝矿","硅矿","镍矿","钛矿","钨矿","钴矿","铬矿","硫矿"];

try{

for(let i in itemIDs){
    IDRegistry.genItemID(itemIDs[i]); 
    Item.createItem(itemIDs[i],itemNames[i],{name: itemIDs[i],meta: 0},{isTech: false,stack: 64});
}

for(let i in toolIDs){
    IDRegistry.genItemID(toolIDs[i]); 
    Item.createItem(toolIDs[i],toolNames[i],{name: toolIDs[i],meta: 0},{isTech: false,stack: 1});
}

for(let i in mechiIDs){
    IDRegistry.genBlockID(mechiIDs[i]);
    Block.createBlockWithRotation(mechiIDs[i], [
{name: mechiNames[i], texture: [["nailed_mechanical_housing", 0], ["mh_top_vent", 0], ["nailed_mechanical_housing", 0], [mechiIDs[i], 0], ["nailed_mechanical_housing", 0] , ["nailed_mechanical_housing", 0]], inCreative: true}
]);
}

for(let i in blockIDs){
    IDRegistry.genBlockID(blockIDs[i]);
    Block.createBlock(blockIDs[i], [
{name:blockNames[i], texture: [[blockIDs[i], 0], [blockIDs[i], 0], [blockIDs[i], 0], [blockIDs[i], 0], [blockIDs[i], 0] , [blockIDs[i], 0]], inCreative: true}
]);
}

}catch(e){print(e)}

function cleanSlot(ctx,slot){
    ctx.container.getSlot(slot).id=0;
    ctx.container.getSlot(slot).data=0;
    ctx.container.getSlot(slot).count=0;
}

function makeModelTo(blockId,shapeCallBack){
    var Model = {
        model:function(block){
            BlockRenderer.addRenderCallback(block, function(api, coords){
                shapeCallBack(api,coords);
            });
        },
        other:function(block){
            BlockRenderer.enableCustomRender(block);
        },
        set:function(block){
            this.model(block);
            this.other(block);
        }
    };
    Model.set(blockId);
}
//GUI Part
let furnaceGui = new UI.StandartWindow({
     standart: {
          header: {
               text: {
                    text: "mechanical furnace"
               },
               color: android.graphics.Color.rgb(0x47, 0x26, 0x0c),
          },
          inventory: {
               standart: true
          },
          background: {standart: true}
     },
     drawing: [
		{type: "bitmap", x: 560, y: 160, bitmap: "arrow_bar_background", scale: 3.2},
	],
     elements: {
         "arrow":{type:"scale", x: 560, y:160, direction: 0, value: 0.5, bitmap: "arrow_bar_scale", scale: 3.2},
         "slot1": {type: "slot", x: 460, y: 150, size: 80},
         "slot2": {type: "slot", x: 660, y: 150, size: 80}
     }
});


TileEntity.registerPrototype(BlockID.mechanical_furnace, {
defaultValues: {
progress: 0
},
click: function(id, count, data, coords){
    this.data.progress=0;
    this.data.time=0;
},
tick:function(){
    if(this.container.getSlot("slot1").count!==0){
        if(this.container.getSlot("slot2").id===0||this.container.getSlot("slot2").id==ItemID.tin){
            this.container.setScale("arrow",this.data.progress);
            if(this.data.time++ ==20){
                this.data.progress+=0.1;
                this.data.time=0;
            }
            if(this.data.progress>=1){
                this.container.getSlot("slot2").id=ItemID.tin;
                this.container.getSlot("slot2").data=0;
                this.container.getSlot("slot2").count++;
                this.container.setScale("arrow",0);
                if(this.container.getSlot("slot1").count==1)
                    cleanSlot(this,"slot1");
                else
                    this.container.getSlot("slot1").count--;
                this.data.progress=0;
            }
        }else return;
    }else{
        cleanSlot(this,"slot1");
        this.container.setScale("arrow",0);
        this.data.progress=0;
    }
},
getGuiScreen: function(){
return furnaceGui;
}
});
