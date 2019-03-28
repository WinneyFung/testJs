const http = new XMLHttpRequest();
http.open('get', '/api/recipes/all?pageNum=1', true);
http.onreadystatechange = function (e) {
   if (this.readyState==4) {
       console.log(this.response,'.......................')
   }
}
http.onload = function(e) {
    console.log(e.target.response);
}
http.send();
console.log('xhr')