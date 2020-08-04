let skill_formatter = function(value, context) {
    switch(value) {
        case 0:
            return "No Experience";
        case 1:
            return "Novice";
        case 2: 
            return "Intermediate";
        case 3: 
            return "Advanced";
        case 4:
            return "Expert";
    }
}

let skill_mapper = function(label, index, labels) {
    switch (label) {
        case 0:
            return "No Experience";
        case 1:
            return "Novice";
        case 2: 
            return "Intermediate";
        case 3: 
            return "Advanced";
        case 4:
            return "Expert";
    }
}

let skills_data = [
    [1, 2, 3, 4],
    [2, 3, 1, 4],
    [3, 1, 4, 2],
]

let options = {
    plugins: {
        datalabels: {
            formatter: skill_formatter,
            anchor: 'end',
            align: 'end',
            offset: 0
        }
    },
    legend: {
        display: false
    },
    scales: {
        xAxes: [{
            gridLines: {
                offsetGridLines: true, 
                display: false
            }
        }],
        yAxes: [{
            gridLines: {
                display: false,
                drawBorder: false,
            },
            ticks: {
                min: 0,
                max: 4.3,
                stepSize: 1,
                display: false
            }
        }]
    },
    maintainAspectRatio: false,
}

window.onload = function() {

    if (-rect.top < scroll_vert_long[0].clientHeight / 3) {
        window.graph_data_ref = 0;
    } else if (-rect.top < scroll_vert_long[0].clientHeight * 2 / 3) {
        window.graph_data_ref = 1;
    } else {
        window.graph_data_ref = 2;
    }

    console.log(window.graph_data_ref, skills_data[window.graph_data_ref]);

    let skills_dataset = {
        labels: ['skill1', 'skill2', 'skill3', 'skill4'],
        datasets: [{
            barPercentage: 0.7,
            barThickness: 'flex',
            minBarLength: 2,
            data: skills_data[window.graph_data_ref],
        }]
    };


    let ctx = document.getElementById('skill-chart').getContext('2d');
    window.myBar = new Chart(ctx, {
        type: 'bar',
        data: skills_dataset,
        options: options
    });

}

// add animation for data updates based on scroll

window.addEventListener('scroll', function(e) {
    let rect = scroll_vert_long[0].getBoundingClientRect()
    let new_graph_data_ref = 0
    if (-rect.top < scroll_vert_long[0].clientHeight / 4) {
        new_graph_data_ref = 0;
    } else if (-rect.top < scroll_vert_long[0].clientHeight / 2) {
        new_graph_data_ref = 1;
    } else {
        new_graph_data_ref = 2;
    }

    if (new_graph_data_ref == window.graph_data_ref) {
        //pass;
    } else {
        window.graph_data_ref = new_graph_data_ref;
        window.myBar.data.datasets.forEach(function(dataset) {
            dataset.data = skills_data[window.graph_data_ref]
        });
        window.myBar.update();
    }

    

  });
