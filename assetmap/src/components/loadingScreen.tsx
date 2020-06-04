import * as React from 'react';

export const loadingScreen = 
  <div className="container" style={{ height: "80vh" }}>
    <div className="row h-100">
      <div className='col d-flex align-items-center justify-content-center'>
        <svg style={{ margin: 'auto', background: 'rgb(242, 242, 242)', display: 'block', shapeRendering: 'auto' }} width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
          <circle cx="84" cy="50" r="7.00274" fill="#41d3bd">
            <animate attributeName="r" repeatCount="indefinite" dur="0.5s" calcMode="spline" keyTimes="0;1" values="10;0" keySplines="0 0.5 0.5 1" begin="0s" />
            <animate attributeName="fill" repeatCount="indefinite" dur="2s" calcMode="discrete" keyTimes="0;0.25;0.5;0.75;1" values="#41d3bd;#f2f2f2;#83d335;#f18f01;#41d3bd" begin="0s" />
          </circle><circle cx="16" cy="50" r="0" fill="#41d3bd">
            <animate attributeName="r" repeatCount="indefinite" dur="2s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="0s" />
            <animate attributeName="cx" repeatCount="indefinite" dur="2s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="0s" />
          </circle><circle cx="16" cy="50" r="2.99726" fill="#f18f01">
            <animate attributeName="r" repeatCount="indefinite" dur="2s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.5s" />
            <animate attributeName="cx" repeatCount="indefinite" dur="2s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.5s" />
          </circle><circle cx="26.1907" cy="50" r="10" fill="#83d335">
            <animate attributeName="r" repeatCount="indefinite" dur="2s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-1s" />
            <animate attributeName="cx" repeatCount="indefinite" dur="2s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-1s" />
          </circle><circle cx="60.1907" cy="50" r="10" fill="#f2f2f2">
            <animate attributeName="r" repeatCount="indefinite" dur="2s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-1.5s" />
            <animate attributeName="cx" repeatCount="indefinite" dur="2s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-1.5s" />
          </circle>
        </svg>
      </div>
    </div>
</div>;
