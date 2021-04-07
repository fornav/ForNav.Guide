window.onload = function(){
    // var guideBtns = document.getElementsByClassName("guideBtn");
    // // var saas = document.getElementById('saas');
    // // var prem = document.getElementById('prem');
    // var i;
    
    // for (i = 0; i < guideBtns.length; i++) {
    //     guideBtns[i].style.cursor = 'pointer';
    
    //     guideBtns[i].onmouseover = function() {
    //         // this.style.backgroundColor = 'red';
    //         this.style.borderColor = '#747474';
    //         // this.style.fontWeight = 'bold';
    //     };
    //     guideBtns[i].onmouseout = function() {
    //         this.style.backgroundColor = '';
    //         this.style.fontWeight = '';
    //         this.style.borderColor = '';
    //     };
    //     guideBtns[i].onclick = function() {
    //         window.location = this.dataset.link;
    //     };
    // }
};

function LoadGuideButtons() {
    var guideBtns = document.getElementsByClassName("guideBtn");
    // var saas = document.getElementById('saas');
    // var prem = document.getElementById('prem');
    var i;
    
    for (i = 0; i < guideBtns.length; i++) {
        guideBtns[i].style.cursor = 'pointer';
    
        guideBtns[i].onmouseover = function() {
            this.style.backgroundColor = '#eb6844';
            this.style.color = '#5d6d7e';
        };
        guideBtns[i].onmouseout = function() {
            this.style = '';
        };
        guideBtns[i].onclick = function() {
            window.location = this.dataset.link;
        };
    }
}
