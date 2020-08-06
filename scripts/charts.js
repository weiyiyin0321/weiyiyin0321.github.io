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
    [3, 4, 4, 4, 2, 3, 4, 4, 3, 3, 4, 4, 1, 1],
    [2, 3, 1, 0, 0, 0, 0, 3, 3, 2, 4, 4, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 4, 4, 0, 0],
]

let abilities_data = [
    [4, 4, 3, 3, 4, 2, 4, 3, 4, 3, 3, 4, 3, 2],
    [3, 3, 2, 1, 2, 0, 3, 3, 4, 2, 3, 2, 1, 0],
    [1, 1, 0, 0, 0, 0, 2, 1, 3, 1, 3, 0, 0, 0]
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
                display: false,
                drawBorder: false,
            },
            ticks: {
                min: 0,
                max: 4.5,
                stepSize: 1,
                display: false
            }
        }],
        yAxes: [{
            gridLines: {
                display: false,
            },

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
        labels: [
            'Python', 
            'Pandas', 
            'Sklearn', 
            'PySpark', 
            'Tensorflow', 
            'Docker', 
            'Hive', 
            'SQL', 
            'R', 
            'Tableau',
            'Excel',
            'PowerPoint',
            'HTML / CSS',
            'JavaScript',
        ],
        datasets: [{
            barPercentage: 0.7,
            barThickness: 'flex',
            minBarLength: 2,
            data: skills_data[window.graph_data_ref],
        }]
    };

    let abilities_dataset = {
        labels: [
            'Regression', 
            'Classification', 
            'Clustering', 
            'Boosting', 
            'Trees',
            'Neural Networks', 
            'Data Analysis', 
            'Hypothesis Testing', 
            'Financial Analysis', 
            'Strategic Marketing', 
            'Root Cause Analysis',
            'Customer Targeting',
            'Automation',
            'Project Management',
        ],
        datasets: [{
            barPercentage: 0.7,
            barThickness: 'flex',
            minBarLength: 2,
            data: skills_data[window.graph_data_ref],
        }]
    };


    let skill_chart = document.getElementById('skill-chart').getContext('2d');
    window.skill_bar = new Chart(skill_chart, {
        type: 'horizontalBar',
        data: skills_dataset,
        options: options
    });

    let abilities_chart = document.getElementById('abilities-chart').getContext('2d');
    window.abilities_bar = new Chart(abilities_chart, {
        type: 'horizontalBar',
        data: abilities_dataset,
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
        window.skill_bar.data.datasets.forEach(function(dataset) {
            dataset.data = skills_data[window.graph_data_ref]
        });
        window.abilities_bar.data.datasets.forEach(function(dataset) {
            dataset.data = abilities_data[window.graph_data_ref]
        });
        window.skill_bar.update();
        window.abilities_bar.update();
    }

    

  });
