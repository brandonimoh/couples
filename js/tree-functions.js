    
    {
        //general
    }
    
    // Function to add carets (calling this twise adds double event listener)
      function addCarets(){
        var toggler = document.getElementsByClassName("caret");
        var i;

        for (i = 0; i < toggler.length; i++) {
            //check if added before
             if (toggler[i].getAttribute('listener') == 'true') {
            toggler[i].removeEventListener("click", funList_Clicked); //// Remove the event handler from <div>
            toggler[i].setAttribute('listener', 'false'); //note it
            }
            toggler[i].addEventListener("click", funList_Clicked);
            toggler[i].setAttribute('listener', 'true'); //note it
        }
      }
      //Callback for addCarets()
      function funList_Clicked() {
        this.parentElement.querySelector(".nested").classList.toggle("active");
        this.classList.toggle("caret-down");
      }
     addCarets(); //initial function call

     //this function calles the iterative getMenu function
     //the purpose is to create a ul list from JSON
     function call_getMenu(dataIn, dDiv, treeType){
      var dataIn_testIn = [{"id": "1", "first_name": "name_1", "parent_idr": "0", "depth": "0"},
                        {"id": "2", "first_name": "name_2", "parent_idr": "0", "depth": "0"},
                        {"id": "3", "first_name": "name_3", "parent_idr": "1", "depth": "1"},
                        {"id": "4", "first_name": "Obadan Pedro", "parent_idr": "41", "depth": "1"},
                         {"id": "4", "first_name": "name_4", "parent_idr": "3", "depth": "2"}
                      ];
        //var dataIn_testIn= [{"id": "1","first_name": "Irotore","sur_name": "Obadan","parent_idr": "0","year": "1770","gender": "male","depth": "0"}, {"id": "2","first_name": "Irorie","sur_name": "Obadan","parent_idr": 3,"year": "1779","gender": "female","depth": "3"}]; //,{"id":3,"first_name":"Udoigbe","sur_name":"Obadan","parent_idr":5,"year":1775,"gender":"male","depth":5},{"id":4,"first_name":"Oiseoruinmwan","sur_name":"Obadan","parent_idr":1,"year":1776,"gender":"male","depth":1},{"id":5,"first_name":"Ishoshenho","sur_name":"Obadan","parent_idr":4,"year":1777,"gender":"male","depth":4},{"id":6,"first_name":"Igele","sur_name":"Obadan","parent_idr":3,"year":1779,"gender":"male","depth":3},{"id":7,"first_name":"Uzebba","sur_name":"Obadan","parent_idr":6,"year":1777,"gender":"male","depth":6},{"id":8,"first_name":"Uduigwome","sur_name":"Obadan","parent_idr":6,"year":1775,"gender":"male","depth":6},{"id":9,"first_name":"OBADAN","sur_name":"Obadan","parent_idr":6,"year":0,"gender":"male","depth":6},{"id":10,"first_name":"Oiseorunmwn","sur_name":"Obadan","parent_idr":6,"year":0,"gender":"male","depth":6},{"id":11,"first_name":"Oikelome","sur_name":"Obadan","parent_idr":6,"year":0,"gender":"male","depth":6},{"id":12,"first_name":"Omiunu","sur_name":"Obadan","parent_idr":6,"year":0,"gender":"male","depth":6},{"id":13,"first_name":"Name Unknown","sur_name":"Surname Unknown","parent_idr":6,"year":0,"gender":"female","depth":6},{"id":14,"first_name":"Mama","sur_name":"Idiegbeah","parent_idr":7,"year":1821,"gender":"female","depth":7},{"id":15,"first_name":"Ishanmiewan","sur_name":"Obadan","parent_idr":7,"year":0,"gender":"male","depth":7},{"id":16,"first_name":"Jaueola","sur_name":"Obadan","parent_idr":7,"year":0,"gender":"male","depth":7},{"id":17,"first_name":"Ezekiel","sur_name":"Obadan","parent_idr":7,"year":0,"gender":"male","depth":7},{"id":18,"first_name":"Modupe","sur_name":"Nee Obadan","parent_idr":7,"year":0,"gender":"female","depth":7},{"id":19,"first_name":"sdfsd","sur_name":"ffaSf","parent_idr":8,"year":0,"gender":"7t","depth":8}];
        dataIntest = (JSON.stringify(dataIn_testIn)).trim();

        console.log('data inputed to call_getMenu() \n' + dataIn); 
        data=JSON.parse(dataIn); //finally worked (Why does this cause error?)
        console.log('Parsed data in call_getMenu() \n' + data); 
        console.log('Item[0] Parsed data in call_getMenu() \n' + data[0].first_name);                
          var initLevel = 0;
          var parentID= "0";
          //endMenu=getMenu("0");
         // document.getElementById(dDiv).innerHTML = '<ul id="genBasicUL" >'+endMenu.join('')+ '</ul>';
          //var dDiv='demoAjax'
          console.log('TreeType \n' + treeType); 
          if (treeType=="basicTree"){
            endMenu=getMenu("0");
            console.log("Generated list: " + "\n" + endMenu)
            document.getElementById(dDiv).innerHTML = '<ul id="genBasicUL"><li>Family Tree</li>'+endMenu.join('')+ '</ul>';
          }else if (treeType=="cleanTree"){
            endMenu=getMenu("0");
            console.log("Generated list: " + "\n" + endMenu)
            document.getElementById(dDiv).innerHTML = '<ul id="genCleanUL" class="tree"><li>Family Tree</li>'+endMenu.join('')+ '</ul>';
          } else if(treeType=="pillsTree"){
            initLevel="0";              //TODO: select a depth
            endMenu=getMenu(initLevel); 
            //endMenu.replace('<li>', '<li>');
            endMenu.replace('</li>', '<a href="http://localhost/efamily/app/update.php?id=2">update </a></li>');
            console.log("Generated list: " + "\n" + endMenu)
            document.getElementById(dDiv).innerHTML = '<ul id="genPillsUL"><li>Family Tree</li>'+endMenu.join('')+ '</ul>';
          }else {
            endMenu=getMenu("0");  
          console.log("Generated list: " + "\n" + endMenu)
          document.getElementById(dDiv).innerHTML = '<ul id="genUL"><li>Family Tree</li>'+endMenu.join('')+ '</ul>';
          }
          

           function getMenu ( parentID ){
              return data.filter(function(node){
                 return ( node.parent_idr === parentID); 
              }).map(function(node){
                  var exists = data.some(function(childNode){  
                        return childNode.parent_idr === node.id; 
                  });
                  if (exists) {
                    subMenu='<ul class ="nested active">'+ getMenu(node.id).join('') + '</ul>'
                    console.log('iteration(n)  subMenu: ' + "\n" + subMenu); //svr/api.php/records/efamily/'+ id //GET /records/categories?filter=name,eq,Internet
                    return '<li><span class="caret caret-down"><a class="family-link" href="svr/api.php/records/efamily?filter=parent_idr,eq,'+node.id+'" id="'+node.id + '">'+ node.first_name + '</a></span>'  + subMenu + '</li>' ;
                  }  else {
                    subMenu='';
                    return '<li><span><a class="family-link" href="svr/api.php/records/efamily?filter=parent_idr,eq,'+node.id+'" id="'+ node.id + '">'+node.first_name+ '</a></span>' +  subMenu + '</li>' ;
                  }
                  //subMenu = (exists) ? '<ul class ="nested">'+ getMenu(node.id).join('') + '</ul>' : "";
                  //return '<li><span class="caret">'+node.name +  subMenu + '</li>' ;
              });
            }; // end inner fxn

          
    addCarets();
    addFamilyLinkEvents();
    }


    function call_getMenu_with_pills(dataIn2, dDiv2, treeType2){
      var dataIn2 = [{"id": "1", "first_name": "name_1", "parent_idr": "1", "depth": "1"},
                        {"id": "2", "first_name": "name_2", "parent_idr": "1", "depth": "1"},
                        {"id": "3", "first_name": "name_3", "parent_idr": "1", "depth": "1"},
                        {"id": "4", "first_name": "Obadan Pedro", "parent_idr": "41", "depth": "1"},
                         {"id": "4", "first_name": "name_4", "parent_idr": "3", "depth": "2"}
                      ];
         //alert(data);           //data=data_test;
         console.log('data inputed to call_getMenu() \n' + dataIn2); 
          data2=JSON.parse(dataIn2); //finally worked
          console.log('data inputed to call_getMenu() obj \n' + data2); 
          console.log('data inputed to call_getMenu() str \n' + JSON.stringify(data2)); 
          var initLevel = 0;
          var parentID= "0";
            initLevel="0";              //TODO: select a depth
            endMenu2=getMenu2(initLevel); 
            console.log('data inputed to endmenu \n' + endMenu2); 
            document.getElementById(dDiv2).innerHTML = '<ul id="genPillsUL" class="list-group animate__animated animate__backInRight animate__delay-1s"><li>Family Tree</li>'+endMenu2.join('')+ '</ul>';

           function getMenu2 ( parentID ){
              return data2.map(function(node2){
                    tmpLi = '<li class="list-group-item d-flex justify-content-between  align-items-center"><span><a href="svr/model.php?parent_idr='+node2.id+' id="'+ node2.first_name + '">'+node2.first_name+ '</a><a href="update.php?id=2">update </a><span class="badge badge-primary badge-pill">1900?</span><span class="badge badge-secondary badge-pill">F</span></span>' +  subMenu2 + '</li>' ;
                    console.log('iteration(n) for pills  tmpLi: ' + "\n" + tmpLi);
                    return tmpLi;
              });
            }; // end inner fxn
    
    addCarets();
    }

    //BASIC TREE: json post array using ajax uses <div id=basic-tree> and calls php-to-json.php
    $(document).ready( function() {
        //$('#btn_ajax_post_data_array').click(function() {
            $.ajax({
                type: 'POST',
                url: 'svr/php-to-json.php',
                data: 'id=testdata',
                dataType: 'json',
                cache: false,
                success: function(result) {
                    //$('#demoAjax').append(result[0]); //.html(result[0]);
                    //
                    console.log('result of AJAX call on doc load \n'+ result);
                    //data=result;
                    var dR;
                    dR= JSON.stringify(result);
                    dR.replace(/\s+/g,'');
                    console.log('result of AJAX call on doc load Stringified \n'+ dR);
                    //$('#demoAjax').text(dR); //.html(result[0]);
                    call_getMenu(dR,'basic-tree', 'basicTree'); 
                    //document.getElementById("list-json").innerHTML = '<ul id="genUL">'+endMenu.join('')+ '</ul>';

                    // addCarets();
                },
            });
        //});
    });

    //BASIC TREE: json post array using ajax on button clickuses <div id=basic-tree> and calls php-to-json.php
    $(document).ready( function() {
        $('#btn_ajax_post_data_array').click(function() {
            $.ajax({
                type: 'POST',
                url: 'svr/php-to-json.php',
                data: 'id=1',
                dataType: 'text', //todo: json
                cache: false,
                success: function(result) {
                    //$('#demoAjax').append(result[0]); //.html(result[0]);
                    //
                    console.log('result of AJAX call on doc load \n'+ result);
                    //data=result;
                    var dR;
                    dR= JSON.stringify(result).trim();
                    dR.replace(/\s+/g,'');
                    console.log('result of AJAX call on doc load Stringified \n'+ dR);
                    //$('#demoAjax').text(dR); //.html(result[0]);
                    call_getMenu(dR,'basic-tree', 'basicTree'); 
                    //document.getElementById("list-json").innerHTML = '<ul id="genUL">'+endMenu.join('')+ '</ul>';

                    // addCarets();
                },
            });
        });
    });

    //loads biodata and photo <div id=info> and calls get-bio.php
    //Or //PILLS TREE: AJAX for Immediate Family 
    $(document).ready( function() {
      $('.family-link').click(function(event) {
          console.log('hyperlink caught');
          isBio=false;
          
            if ($(this).attr('href').includes("bio")) isBio=true;
            event.preventDefault();
            console.log('hyperlink servised');
         
          $.ajax({
              type: 'POST',
              url:  $(this).attr('href'), //'svr/php-to-json.php', //get-bio.php',
              
              data: 'id=1', //TODO: how do we get ID $('#btn_ajax_post_data_array').text
              dataType: 'json',
              cache: false,
              success: function(result) {
                  // {"records":[{"id":4,"first_name":"Oiseoruinmwan","sur_name":"Obadan","title":"Pa","parent_idr":1,"has_children":"yes","children_names":"Ishoshenho","dob":"1776-01-01","year":1776,"is_alive":"no","gender":"male","pix":"\/pix\/2.jpg","bio":"Pa","paternal_maternal":"","dod":"0000-00-00","other_names":"","approved":1,"added_by":0}]}
                  if(isBio){
                    var dR;
                    dR= JSON.stringify(result);
                    dR.replace(/\s+/g,'');
                    //$('#demoAjax').text(dR); //.html(result[0]);
                    console.log('fired');
                    console.log(dR);
                    dR=JSON.parse(result); //convert JSON to HTML
                    console.log('result of AJAX on href clicked for pillsImmediateFamily Stringified \n'+ result);
                    
                    document.getElementById("generated-full-info").innerHTML = '<p id="genBio"> '+ dR + ' </p>';
                    document.getElementById("info").innerHTML = '<p id="genBio"> '+ dR.substr(0, 20) + ' </p>';
                    $(document).scrollTop($("#info").offset().top);     //now scroll to bio section
                  } else {
                    console.log('Returned data strinified \n' + JSON.stringify(result));
                    var dR;
                    dR= JSON.stringify(result);
                    dR.replace(/\s+/g,'');
                    call_getMenu_with_pills(dR,'json-list-branch', 'pillsTree'); 
                  }
                  // addCarets();
              },
              error: function(jqXHR, exception){
                alert('There wan an error in AJAX call: ' + exception)
                console.log('There wan an error in AJAX call: ' + exception )
              },
          });
      });
    });

    // Function to custom event handlers for familyLinks 
    function addFamilyLinkEvents(){
      var toggler = document.getElementsByClassName("family-link");
      var i;

      for (i = 0; i < toggler.length; i++) {
          //check if added before
            if (toggler[i].getAttribute('listener') == 'true') {
          toggler[i].removeEventListener("click", funFamList_Clicked); //// Remove the event handler from <div>
          toggler[i].setAttribute('listener', 'false'); //note it
          }
          toggler[i].setAttribute('listener', 'true'); //note it
          toggler[i].addEventListener("click", funFamList_Clicked);
      }        
      
    }
    //Callback for addFamilyLinkEvents()
    function funFamList_Clicked() {
              console.log('hyperlink family-link caught');
        isBio=true;
        event.preventDefault();
        console.log('hyperlink family-link  ignore, custum handler activated');
        console.log($(this).attr('href'))
        
        $.ajax({
            type: 'POST',
            url:  $(this).attr('href'), //'svr/php-to-json.php', //get-bio.php',
            data: 'id=1', //TODO: how do we get ID $('#btn_ajax_post_data_array').text
            dataType: 'json',
            cache: false,
            success: function(result) {
                
                if(isBio){
                  var dR;
                  dR= JSON.stringify(result);
                  dR.replace(/\s+/g,'');
                  //$('#demoAjax').text(dR); //.html(result[0]);
                  console.log('fired');
                  console.log(dR);
                  //dR=JSON.parse(result); //convert JSON to HTML
                  //dR=dR; //extract bio
                  
                  document.getElementById("generated-full-info").innerHTML = '<p id="genBio"> '+ dR + ' </p>';
                  document.getElementById("info").innerHTML = '<p id="genBio"> '+ dR.substr(0, 100) + ' ... </p>';
                  $(document).scrollTop($("#info").offset().top);     //now scroll to bio section
                } else {
                  console.log('Hey!' + JSON.stringify(result));
                  var dR;
                  dR= JSON.stringify(result);
                  dR.replace(/\s+/g,'');
                  call_getMenu_with_pills(dR,'json-list-branch', 'pillsTree'); 
                }
            },
        });

    }


