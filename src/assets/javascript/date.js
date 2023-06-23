
    export function date(){
        $(function(){
            var dtToday = new Date();

            var month = dtToday.getMonth() + 1;
            var day = dtToday.getDate();
            var year = dtToday.getFullYear();
            if(month < 10)
                month = '0' + month.toString();
            if(day < 10)
             day = '0' + day.toString();
            var maxDate = year + '-' + month + '-' + day;
            $('#inputdate').attr('min', maxDate);
        });
    }

    export function calendar(){
        document.getElementById('fecha').value='';
        window.alert('No se puede ingresar fechas por teclado');
    }
