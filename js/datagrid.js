if (!jQuery) {
	throw new Error("lubandatagrid.js requires jQuery")
};
(function($) {
	$.fn.lubandatagrid = function(options) {
		if (!options || !options.columns) return;

		var $self = $(this),
			columns = options.columns,
			rows = options.size,
			$add = $(options.add),
			$delete = $(options.delete);
		var LB = $.fn.lubandatagrid;

		//渲染表头
		LB.beforerender = function() {
			var thead = ["<thead><tr>"];
			//thead.push('<th width="50">选择</th>')
			for (var i = 0; i < columns.length; i++) {
				columns[i].width = columns[i].width || "";
				thead.push('<th width="'+columns[i].width+'">' + columns[i].field + '</th>')
			}
			thead.push("</tr></thead>");
			return thead.join("");
		}

		//初始化表格
		LB.renderdata = function() {
			var tbody = ['<tbody id="lubandatagrid-rows">'];
			for (var i = 0; i < rows; i++) {
				LB.addrow(i,tbody)
			}
			tbody.push('</tbody>');

			return tbody.join('');
		}
        
        //添加一行
		LB.addrow = function(i,row){
			row = row || [];
			var tdbox = "";
				select = [];
				select.push('<option value="">请选择</option>');

				for (var s = 0; s < 5; s++) {
					select.push('<option value="0023'+s+'"> 鲁班'+ s + '</option>');
				}

			row.push('<tr data-index="' + i + '">');
			/*if(i === 0){
				row.push('<td></td>');
			}else{
				row.push('<td><input type="checkbox" class="isCheck"></td>');
			}*/
			
			for (var j = 0; j < columns.length; j++) {

				if (columns[j].type !== "combox" && columns[j].type !== "radio" && columns[j].type !== "checkbox") {
					columns[j].same&&i!=0 ? tdbox = '<td><div class="input-group"><input class="form-control" title="'+columns[j].title+'" name="' + columns[j].name + '" type="' + columns[j].type + '" /><label class="input-group-addon"><input type="checkbox" class="samepre">同上</lable></div></td>' :
						tdbox = '<td><div class="form-group"><input class="form-control" title="'+columns[j].title+'" name="' + columns[j].name + '" type="' + columns[j].type + '" /></div></td>';
					
				} else {
					columns[j].same&&i!=0 ? tdbox = '<td><div class="input-group"><select class="form-control" title="'+columns[j].title+'" name="' + columns[j].name + '" > ' + select.join('') + '</select><label class="input-group-addon"><input type="checkbox" class="samepre">同上</lable></div></td>' :
						tdbox = '<td><div><select class="form-control" title="'+columns[j].title+'" name="' + columns[j].name + '" > ' + select.join('') + '</select></div></td>';
				}
				row.push(tdbox);
			}
			row.push('</tr>');
		}
		//渲染select数据

		//添加同上事件
		LB.addevent = function(){
			//checkbox
			$self.on('click','.samepre',function(e){
				var $prevInput = $(this).parent().prev();
				if($(this).is(":checked")){		
					if($prevInput[0].type === 'password' && !LB.getSame(this)){
						return false;
					}
					$prevInput.val(LB.getSame(this)).attr('disabled',true);
				}else{
					$prevInput.removeAttr('disabled');
				}
			});
			//input change
			$self.on('keyup','input',function(e){
				LB.changeloop(this);
				$(this).tooltip('hide');
			});
			//select change
			$self.on('change','select',function(e){
				LB.changeloop(this);
				$(this).tooltip('hide');
			})
            
            //select a row
            $self.on('click','.isCheck',function(e){
            	var $row = $(this).parent().parent();
            		$row.toggleClass('danger');
            	
            })
			//delete
			$delete.on('click',function(e){
				var $row = $self.find('tr.danger');
				$row.remove();
			})
			//add
			$add.on('click',function(e){
				var row = [];
				LB.addrow(++rows,row);
				$('#lubandatagrid-rows').append(row.join(''));
			});

			//check not null
			$('#lubandatagrid-rows').on('focus','tr:not(:first) input', function(e){
				var $parentTr = $(this).parents('tr').prev();
				var isAllpass = true;
				if(LB.isPass($parentTr)){
					while(LB.isPass($parentTr) && $parentTr.prev()[0]){
						$parentTr = $parentTr.prev();
						if(!LB.isPass($parentTr)){
							isAllpass = false;
							break;
						}
					}
				}else{
					isAllpass = false;
				}
				if(!isAllpass){
					console.log($parentTr.data('index'));
					LB.checkrow($parentTr);
				}
			});
		}
		//循环获取 上一级非空内容
		LB.getSame = function(sameitem){
			var presame = $(sameitem).parents('tr').prev(),
				preName = $(sameitem).parent().prev()[0];
			var precheck = presame.find('input[name="'+preName.name+'"]')[0] ||
				presame.find('select[name="'+preName.name+'"]')[0];

			while(precheck && !precheck.value ){
				presame = presame.prev();
				precheck = presame.find('input[name="'+preName.name+'"]')[0] ||
				presame.find('select[name="'+preName.name+'"]')[0];
			}
			
			return precheck ? precheck.value : '';
		}
		//向下循环修改'同上'，直到'同上'为空
		LB.changeloop = function(sameitem){
			var nextsame = $(sameitem).parents('tr').next(),
				nextName = $(sameitem)[0];
			var nextcheck = nextsame.find('input[name="'+nextName.name+'"]').next().find('input[type="checkbox"]')[0] || 
							nextsame.find('select[name="'+nextName.name+'"]').next().find('input[type="checkbox"]')[0];
			//中间有空白间隔或者是某行参考
            if($(nextcheck).is(':checked') || $(nextsame.find('input[name="'+nextName.name+'"]')[0]||nextsame.find('select[name="'+nextName.name+'"]')[0]).val() == ''){
	            while(nextsame.length != 0){
					if($(nextcheck).is(':checked')){
						//空值处理
						/*if(!nextName.value){

						}*/
						$(nextsame.find('input[name="'+nextName.name+'"]')[0]||nextsame.find('select[name="'+nextName.name+'"]')[0]).val(nextName.value);
					}
					if(!$(nextcheck).is(':checked') && $(nextsame.find('input[name="'+nextName.name+'"]')[0]||nextsame.find('select[name="'+nextName.name+'"]')[0]).val() != ''){
						break;
					}
					nextsame = nextsame.next();
					nextcheck = nextsame.find('input[name="'+nextName.name+'"]').next().find('input[type="checkbox"]')[0] || 
									nextsame.find('select[name="'+nextName.name+'"]').next().find('input[type="checkbox"]')[0];
				}
		    }
		}

		//非空信息完整检测
		LB.isPass = function($tr){
			//var $tr = $(input).parent().parent();		
			var cols = 0;
			$(':input',$tr).each(function(){
				if(this.type === 'text' || this.type === 'password' || this.tagName.toLowerCase() === 'select'){
					if(!this.value){
						++cols;
					}
				}
			});

			return (cols > 0? cols === columns.length : true);
		}
		LB.checkrow = function($tr){
			$(':input',$tr).each(function(){
				if(this.type === 'text' || this.type === 'password' || this.tagName.toLowerCase() === 'select'){
					if(!this.value){
						$(this).tooltip({
							title:this.title+'不能为空!',
							trigger: 'manual'
						});
						$(this).tooltip('show').focus();
						return false;
					}
				}
			});
		}
		$self.append(LB.beforerender);
		$self.append(LB.renderdata);
		LB.addevent();

		//样式
		$('.form-group',this).css('margin-bottom','0');
	}
    //获取数据
    $.fn.getdatagrid = function(){
    	var trs = $('#lubandatagrid-rows tr'),
			    datagridData = [],row,isNone = true;
			for(var i = 0;i<trs.length;i++){
				 row = {};
				 row['index'] = i;
				 $(':input',trs[i]).each(function(){
				 	//移除空的文本框
				 	if((this.type === 'text' || this.type === 'password' || this.tagName.toLowerCase() === 'select') && this.value){
				 		row[this.name] = this.value;
				 		isNone = false
				 	}			 	
				 });

				 if(!isNone){
				 	 datagridData.push(row);
				 	 isNone = true;
				 }
			}
			return datagridData;
    }
})(jQuery);