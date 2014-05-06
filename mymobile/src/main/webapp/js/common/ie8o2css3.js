function ieStyleApply(){/*ie8o2css3.js*/

/*simple table with alternate colring of tr*/
$(".ie8-table tr:nth-child(odd)").addClass("darkBoxGreyColor-bg");
$(".ie8-table tr:nth-child(even)").addClass("lightBoxGrey-bg");

$(".ie8-table .grid-row:nth-child(odd)").addClass("darkBoxGreyColor-bg");
$(".ie8-table .grid-row:nth-child(even)").addClass("lightBoxGrey-bg");


/*simple table with alternate colring of tr - REVERSED*/
$(".ie8-table-rev tr:nth-child(even)").addClass("darkBoxGreyColor-bg");
$(".ie8-table-rev tr:nth-child(odd)").addClass("lightBoxGrey-bg");

$(".ie8-table-rev .grid-row:nth-child(even)").addClass("darkBoxGreyColor-bg");
$(".ie8-table-rev .grid-row:nth-child(odd)").addClass("lightBoxGrey-bg");



/*complex table alternate coloring with ref to tbody*/


/*bottom border*/
$(".ie8-table-complex tbody:nth-child(even) tr").addClass("boxGreyColor-bg");/*#EFEFEF*/
$(".ie8-table-complex tbody:nth-child(odd) tr").addClass("greyColor-bg");/*#F8F8F8*/

$(".ie8-table-complex tbody:nth-child(odd) .category-details td").addClass("ie8-table-border-bottom");
$(".ie8-table-complex tbody:nth-child(even) .category-details td").addClass("ie8-table-border-bottom");
$(".ie8-table-complex tbody:nth-child(odd) tr:last-child td").removeClass("ie8-table-border-bottom");
$(".ie8-table-complex tbody:nth-child(even) tr:last-child td").removeClass("ie8-table-border-bottom");

$(".ie8-table-complex tbody:nth-child(even) .category-caption td:nth-child(even)").addClass("darkBoxGreyColor-bg");
$(".ie8-table-complex tbody:nth-child(even) .category-details td:nth-child(odd)").addClass("darkBoxGreyColor-bg");/*#E6E6E6*/
$(".ie8-table-complex tbody:nth-child(even) .category-details td:first-child").css("background","none").removeClass("ie8-table-border-bottom");

$(".ie8-table-complex tbody:nth-child(odd) .category-caption td:nth-child(even)").addClass("lightBoxGrey-bg");
$(".ie8-table-complex tbody:nth-child(odd) .category-details td:nth-child(odd)").addClass("lightBoxGrey-bg");/*#EEEEEE*/
$(".ie8-table-complex tbody:nth-child(odd) .category-details td:first-child").css("background","none").removeClass("ie8-table-border-bottom");


$("#top-up-hostory-with-topups tr:nth-child(odd)").addClass("lightBoxGrey-bg");
$("#top-up-hostory-with-topups tr:nth-child(even) td:nth-child(even)").addClass("boxGreyColor-bg");;
$("#top-up-hostory-with-topups tr:nth-child(odd) td:nth-child(even)").addClass("darkBoxGreyColor-bg");


};

var ieStyleInterval = setInterval(function(){ieApplyInterval();},3000);
function ieApplyInterval()
{
  if($(".grid-row:nth-child(even) , tr:nth-child(even)")) {
    ieStyleApply();
    //clearInterval(ieStyleInterval);    
  }
}