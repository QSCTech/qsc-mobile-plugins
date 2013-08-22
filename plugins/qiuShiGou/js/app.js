var data, view;

data = new Data();
$(document).ready(function() {
    view = new View(data);
    view.index();
});
