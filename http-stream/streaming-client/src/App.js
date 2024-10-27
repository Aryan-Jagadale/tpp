import React, { useState, useEffect, useCallback, Suspense,lazy } from "react";
import ReactECharts from "echarts-for-react";
import HeavyComponent from "./HeavyComponent"
// const HeavyComponent = lazy(() => import('./HeavyComponent'));

const StreamingChartComponent = () => {
  const [chartData, setChartData] = useState([]);

  const updateChartData = useCallback((newData) => {
    setChartData((prevData) => {
      const updatedData = [...prevData, newData];

      return updatedData;
    });
  }, []);

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:3001/stream");
    let updateTimer = null;

    const handleMessage = (event) => {
      console.log("event::>", event);

      const data = JSON.parse(event.data);
      if (data) {
        updateChartData(Number(data));
      }
    };

    eventSource.onmessage = handleMessage;

    eventSource.addEventListener("close", () => {
      console.log("Stream closed");
      eventSource.close();
    });

    return () => {
      eventSource.close();
    };
  }, [updateChartData]);

  const option = {
    title: {
      text: "Real-time Streaming Data",
    },
    xAxis: {
      type: "category",
      data: chartData.map((_, index) => index.toString()),
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "Random Value",
        type: "line",
        data: chartData,
      },
    ],
  };

  return (
    <div className="p-4">
     <Suspense fallback={<div>Loading Heavy Component...</div>}>
        <HeavyComponent />
      </Suspense>
      <h1 className="text-2xl font-bold mb-4">Streaming Chart</h1>
      <ReactECharts
        option={option}
        style={{ height: "400px" }}
        notMerge={true}
        lazyUpdate={true}
      />
     
    </div>
  );
};

export default StreamingChartComponent;
