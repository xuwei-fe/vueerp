	<style  lang="less" scoped>
        *{margin:0;padding:0}
		ul.tree {
			padding:3px;
		}
        .tree ul{
            padding:0 0 0 25px;
        }
		.tree li{
			list-style-type:none;
		}
		span.tree-expander{
		  width: 16px;
		  height: 16px;
		  display: inline-block;
		  vertical-align: top;
		  background-repeat: no-repeat;
		  background-position: left;
		  background-position: 0px 0px;
          background-image: url("../img/icons.gif");
		}
		/*------------------------------------------------------------------------------
		 * Expander icon
		 *----------------------------------------------------------------------------*/
		span.tree-expander {
		  cursor: pointer;
		}
		.tree-expander-none span.tree-expander {
		  background-image: none;
		  cursor: default;
		}
		.tree-expander-collapsed span.tree-expander {
		  background-position: 0px -80px;
		}
		.tree-expander-collapsed span.tree-expander:hover {
		  background-position: -16px -80px;
		}
		.tree-expander-expanded span.tree-expander{
		  background-position: -32px -80px;
		}
		.tree-expander-expanded span.tree-expander:hover{
		  background-position: -48px -80px;
		}

	</style>
<template>
    <div id="item-template">
        <li>
            <span @click="toggle"  :class="getClassName()">
                <span class="tree-expander"></span>
				<input type="checkbox" v-show="!IsHidden()">
                <input type="checkbox" v-show="IsHidden()&&!IsEnable()" :checked="ischeckbox()" @change="checked()">
				<input type="checkbox" v-show="IsHidden()&&IsEnable()" disabled :checked="ischeckbox()">
                <span class="tree-title">{{node.name}}</span>
            </span>
            <ul v-if = "hasChildren" v-show = "expanded">
                <v-tree v-for = "node in node.Children" :node = "node" @checknode="checknode">
                </v-tree>
            </ul>
        </li>
    </div>
</template>
<script>

	
    export default {
		data(){
			return {
				expanded :false
			}
		},
		replace: true,
		props:{
			node: Object,
		},
		computed: {
			hasChildren:function(){
				return this.node&&this.node.Children && this.node.Children.length 
			}
		},
		methods:{
			getClassName:function(){
				var className = "";
				if (this.hasChildren) {
					if (this.expanded) {
						className += "tree-expander-expanded"
					}else{
						className += "tree-expander-collapsed"
					}
				}else{
					className += "tree-expander-none"
				}
				return className;
			},
			ischeckbox(){
				var flag="";
				if (this.node.IsChecked) {
					flag =true;
				}else{
					flag =false;
				}
				//console.log(this.node.name,flag)
				return flag;
			},
			IsEnable(){
				var flag="";
				if (this.node.IsEnable) {
					flag =true;
				}else{
					flag =false;
				}
				return flag;
			},
			IsHidden(){
				var flag="";
				if (this.node.IsHidden) {
					flag =true;
				}else{
					flag =false;
				}
				return flag;
			},
			toggle: function(){
				this.expanded = !this.expanded
				//var a=this.node.parentId;
				//aa(this.node)
				//{
				//	if(this.node!=null)
				//	{
				//		if(thisnode.id==a)
				//		aa(this.node);
				//	}
				//}
				
				this.$emit("checknode",this.node)
			},
			checknode(obj){
                this.$emit("checknode",obj)
            },
			checked(){
				this.node.IsChecked=!this.node.IsChecked;
				
			},
			
		}
    }
</script>