/* --------------- Spin Wheel  --------------------- */
const spinWheel = document.getElementById("spinWheel");
const spinBtn = document.getElementById("spin_btn");
const text = document.getElementById("text");
/* --------------- Minimum And Maximum Angle For A value  --------------------- */
const spinValues = [
  { minDegree: 31, maxDegree: 90, value: "Ques 1", link: "https://www.hackerrank.com/contests/drunk-n-code-spin-o-wheel/challenges/cut-the-sticks", target:"_blank",color:"white",style: "color" },
  { minDegree: 331, maxDegree: 30, value: "Ques 2", link: "https://www.hackerrank.com/contests/drunk-n-code-spin-o-wheel/challenges/combo-meal", target:"_blank" ,color:"white",style: "color"},
  { minDegree: 271, maxDegree: 330, value: "Ques 3", link: "https://www.hackerrank.com/contests/drunk-n-code-spin-o-wheel/challenges/the-power-sum", target:"_blank",color:"white",style: "color" },
  { minDegree: 211, maxDegree: 270, value: "Ques 4", link: "https://www.hackerrank.com/contests/drunk-n-code-spin-o-wheel/challenges/two-characters", target:"_blank",color:"white",style: "color"},
  { minDegree: 151, maxDegree: 210, value: "Ques 5", link: "https://www.hackerrank.com/contests/drunk-n-code-spin-o-wheel/challenges/constructing-a-number", target:"_blank",color:"white",style: "color" },
  { minDegree: 91, maxDegree: 150, value: "Ques 6", link: "https://www.hackerrank.com/contests/drunk-n-code-spin-o-wheel/challenges/summing-the-n-series", target:"_blank",color:"white",style: "color" },
];
/* --------------- Size Of Each Piece  --------------------- */
const size = [20,20,20,20,20,20];
/* --------------- Background Colors  --------------------- */
var spinColors = [
  "#E74C3C",
  "#7D3C98",
  "#2E86C1",
  "#138D75",
  "#F1C40F",
  "#D35400",
];
/* --------------- Chart --------------------- */
/* --------------- Guide : https://chartjs-plugin-datalabels.netlify.app/guide/getting-started.html --------------------- */
let spinChart = new Chart(spinWheel, {
  plugins: [ChartDataLabels],
  type: "pie",
  data: {
    labels: [1, 2, 3, 4, 5, 6],
    datasets: [
      {
        backgroundColor: spinColors,
        data: size,
      },
    ],
  },
  options: {
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      tooltip: false,
      legend: {
        display: false,
      },
      datalabels: {
        rotation: 90,
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 45 },
      },
    },
  },
});
/* --------------- Display Value Based On The Angle --------------------- */
const generateValue = (angleValue) => {
  for (let i of spinValues) {
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      text.innerHTML = `<p>Congratulations, You have got ${i.value} to solve. <br> Click to Solve Code <a href=${i.link} target=${i.target} style="${i.style}:${i.color}"=> ${i.value} </a></p>`;
      spinBtn.disabled = false;
      break;
    }
  }
};
/* --------------- Spinning Code --------------------- */
let count = 0;
let resultValue = 101;
spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  text.innerHTML = `<p>Best Of Luck!</p>`;
  let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
  let rotationInterval = window.setInterval(() => {
    spinChart.options.rotation = spinChart.options.rotation + resultValue;
    spinChart.update();
    if (spinChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      spinChart.options.rotation = 0;
    } else if (count > 15 && spinChart.options.rotation == randomDegree) {
      generateValue(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
    spinBtn.disabled = true;
  }, 20);
});
/* --------------- End Spin Wheel  --------------------- */