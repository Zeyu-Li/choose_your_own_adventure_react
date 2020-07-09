// inits
let counter = 1
let card
const events = {
}
alert_flag = false

const row_start = `
<div class="container main_content">
    <div class="row justify-content-center main">
`
const row_end = `
    </div>
</div>
`

$( document ).ready(() => {
    // when document is ready, add 1 new card
    card = get_card()
    $("#root").append(row_start + card + row_end)
})

function get_card(text = '', background = '', color = '', options = '') {
    // creates a new card and returns it

    if (options == '') {
        options = `Press to Continue [`+ (counter+1) +`]`
    }

    let single_card =  `
<!-- each card -->
<div class="col-4 grid">
    <div class="card"><form>
        <div class="form-group row">
            <label for="inputEmail3" class="col-sm-5 col-form-label">Key:</label>
            <div class="col-sm-5">
                <input type="number" min="1" name="key" class="form-control" id="inputEmail3" value="`+ counter +`">
            </div>
        </div>
        <div class="form-group">
            <div class="input-group mb-3 spacer">
                <div class="input-group-prepend">
                    <label class="input-group-text" for="inputGroupSelect01" >(Under construction)</label>
                </div>
                <select name="algin" class="custom-select" id="inputGroupSelect01" disabled>
                    <option selected>Bottom</option>
                    <option value="1">Center</option>
                    <option value="2">Top</option>
                </select>
            </div>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="text" name="text">` + text + `</textarea>
        </div>

        <!-- background -->
        <div class="form-row">
            <label class="col-form-label">Background: </label>
            <div class="col">
                <input type="text" class="form-control" placeholder="file name" name="image" value='` + background + `'>
            </div>
            <div class="col">
                <input type="color" class="form-control" placeholder="color" name="color" value='` + color + `'>
            </div>
        </div>
        
        <div class="form-group">
            <label for="exampleFormControlTextarea1">Options: </label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="2" name="options">`+ options +`</textarea>
        </div>

        <!-- fade in/out -->
        <div class="spacer">
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" name="fade_in" disabled>
                <label class="form-check-label" for="inlineCheckbox1">Fade In</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" name="fade_out" disabled>
                <label class="form-check-label" for="inlineCheckbox2">Fade Out</label>
            </div>
        </div>
    </form>
    </div>
</div>
    `
    counter++
    return single_card
}


// button clicks
$('#first button').click(()=>{
    card = get_card()
    $('.main_content .main').last().append(card)
})

$('#second button').click(()=>{
    counter--
    $('#root .col-4').last().remove()
})

$('#third button').click(() => {
    $('.help_popup').toggle()
})

// gets a json, load
$('#forth button').click(() => {
    if (!alert_flag) {
        // alert('By loading data, you will erase the current state')
        alert_flag = !alert_flag
    }
    $('.text_popup').toggle()
})

// gets submitted data
$('.submit_data').click(() => {
    // gets data
    let data = $('#json_data').val()

    // if is empty, return
    if (data == "") {
        return
    }
    data = JSON.parse(data)
    counter = 1
    $('.main').empty()

    // for each card data, append card
    for (const element in data){
        card_data = data[element]
        $('.main_content .main').last().append(get_card(card_data[1].value, card_data[2].value, card_data[3].value, card_data[4].value))
    }

    $('.text_popup').toggle()
})

// generate JSON button
$('.generate_btn').click(()=> {
    let current_event, current_number
    $('#root form').each(function(i, value){
        current_event = $(this).serializeArray()
        current_number = current_event[0].value
        events[current_number] = current_event
    })
    let json_data = JSON.stringify(events)
    
    let data = new Blob([json_data], {type: 'application/json'});
    let textFile = URL.createObjectURL(data);
    $('.generate_btn a').attr('href', textFile);
})
