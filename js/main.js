

$(document).ready(function() {
 
    var current_page = 1;
    var max_page = 0;
    var page_main_tittles = [];
    var page_sub_tittles = [];

    // updatePaging(current_page,max_page,page_main_tittles,page_sub_tittles)

    $('.btn-next').click(function() { 
        current_page ++;
        updatePaging(current_page,max_page,page_main_tittles,page_sub_tittles)
    })
    $('.btn-prev').click(function() { 
        current_page --;
        updatePaging(current_page,max_page,page_main_tittles,page_sub_tittles)
    })


  var unique = + new Date();
  // console.log(unique);
  var top = false;
  var number_tops = 0;

  fetch("js/settings.json?ver="+unique)
  .then(response => {
    return response.json();
  })
  .then(function(data) {
    top = data.show_top
    number_tops = data.number_of_top

  }).catch(function(error) {
      console.log(error);
  });

  fetch("js/views.json?ver="+unique)
    .then(response => {
      return response.json();
    })
    .then(function(data) {  
      var count_page=  1;
      // console.log(data.today);

      data.jsonData.forEach(setTables);
      // data.yesterday.forEach(setViewsYesteday); 

      function setPages(item, index) { 

      }

      function setTables(item, index) { 

        // Pagination setup
        max_page++;
        page_main_tittles.push(item.tittle);
        page_sub_tittles.push(item.subTittle);

        // Setup Table content for views per page

        var total = 0;
        // var tittle = item.tittle;
        $('.append_pages').append(""+ 
        '<table name="'+item.tittle+'" class="table table-striped table-hover table-paging table-page-'+count_page+'">'+
        '    <thead>'+
        '      <tr > '+
        '        <th  class="lokals-item d-flex justify-content-between align-items-center"> '+
        '          <div class="p-2 bd-highlight  ">Lokal</div> '+
        '          <div class="p-2 bd-highlight   ">Views</div>'+
        '        </th> '+
        '      </tr>'+
        '    </thead>'+
        '    <tbody class="append_table-'+count_page+'">  '+
        '  </tbody>'+
        '</table>'+
        "")
        

        
 
        var page = item.page;
        var redirectPage = item.redirectPage;
        item.viewData.forEach(setLokals);
        function setLokals(item, index) { 
          total += item.views; 

          // Setup Lokal content and views for each page
          $('.append_table-'+count_page).append(""+
          '<tr> '+
          '    <td > '+
          '        <a href="'+(redirectPage == true? page+'?pageId='+count_page+'&lokal='+item.lokal : '#' )+'" class="lokals-item d-flex justify-content-between align-items-center" id="lokal_'+item.lokal+'">'+
          '          <div class="p-2 link-dark post-title">'+item.lokal+'</div> '+
          '          <div class="p-2 link-dark view-counter '+item.lokal+'_view">'+Math.round(item.views)+'</div>'+
          '        </a>'+
          '    </td>  '+
          '  </tr>  '+
          "")
        }

        // Just for empty space
        $('.append_table-'+count_page).append(""+
        '<tr> '+ 
        '  <td >        '+
        '    <div class="lokals-item lokals-footer d-flex justify-content-between align-items-center">'+
        '      <h3 class="p-2 link-dark post-title text-danger"></h3> '+
        '      <h3 class="p-2 link-dark view-counter text-danger "></h3>'+
        '    </div> '+
        '  </td>  '+
        '</tr>'+
          "")

          // Get total at the end of every page
        $('.append_table-'+count_page).append(""+
        '<tr> '+
        '  <td >        '+
        '    <div class="lokals-item lokals-footer d-flex justify-content-between align-items-center">'+
        '      <h3 class="p-2 link-dark post-title text-danger">Total</h3> '+
        '      <h3 class="p-2 link-dark view-counter text-danger total_view">'+Math.round(total)+'</h3>'+
        '    </div> '+
        '  </td>  '+
        '</tr>'+
          "")

          
        //tops xx locals  
        if(top){

          $('.append_tops').append(""+ 
          '<table   class="table table-striped table-hover top_pages_table top_pages-tables-'+count_page+'">'+
          '    <thead>'+
          '      <tr > '+
          '        <th  class="lokals-item d-flex justify-content-between align-items-center"> '+
          '          <div class="p-2 bd-highlight  ">Top '+number_tops+' Lokals</div> '+
          '          <div class="p-2 bd-highlight   ">Views</div>'+
          '        </th> '+
          '      </tr>'+
          '    </thead>'+
          '    <tbody class="top_pages-'+count_page+'">  '+
          '  </tbody>'+
          '</table>'+
          "") 
  
          var arrTops = item.viewData;
          arrTops.sort(function (a, b) {
              return    b.views - a.views ;
          });
          arrTops= arrTops.slice(0, number_tops);
          
          arrTops.forEach( (item, index) =>{ 
            total += item.views; 
  
            // Setup Lokal content and views for each page
            $('.top_pages-'+count_page).append(""+
            '<tr> '+
            '    <td > '+
            '        <a href="'+(redirectPage == true? page+'?pageId='+count_page+'&lokal='+item.lokal : '#' )+'" class="lokals-item d-flex justify-content-between align-items-center" id="lokal_'+item.lokal+'">'+
            '          <div class="p-2 link-dark post-title">'+item.lokal+'</div> '+
            '          <div class="p-2 link-dark view-counter '+item.lokal+'_view">'+Math.round(item.views)+'</div>'+
            '        </a>'+
            '    </td>  '+
            '  </tr>  '+
            "")
          });  
        } 
        

        count_page++;
      }
         
      updatePaging(current_page,max_page,page_main_tittles,page_sub_tittles)

    }).catch(function(error) {
            console.log(error);
    });
    
    function updatePaging(current_page,max_page,page_main_tittles,page_sub_tittles){
        console.log(page_sub_tittles[0])
        $('.table-paging').hide()
        $('.top_pages_table').hide()
            
        $('.table-page-'+current_page).show()
        $('.top_pages-tables-'+current_page).show()

        $('.page-main-tittle').text(page_main_tittles[current_page-1])
        $('.page-tittle').text(''+page_sub_tittles[current_page-1])
        
        
        if(current_page <= 1){
            $('.btn-prev').hide()
        }else{ 
            $('.btn-prev').show()
        }

        if(current_page == max_page){
            $('.btn-next').hide()
        }else{ 
            $('.btn-next').show()
        }
    }
    
}) 

