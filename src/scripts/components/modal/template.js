var render = exports.render = function(model) {
   return `       
   <div class='modal-container'>
        <div class='modal'>
            <span class='close-btn'><i class="fa fa-times"></i><span>
            <div class='modal-content'>${model.html}</div>
        </div>
        <div class='modal-overlay'></div>
   </div>     
`
};