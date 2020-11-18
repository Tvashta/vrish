import React, { useState, useEffect } from "react";
import axios from "axios";
import download from "../images/download-button.png";
import domtoimage from "dom-to-image";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import ReactTooltip from "react-tooltip";
import { ResponsivePie } from "@nivo/pie";

import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleQuantile } from "d3-scale";

export default function Revenue() {
  const [timeCount, setTimeCount] = useState([]);
  const [timeRev, setTimeRev] = useState([]);
  const INDIA_TOPO_JSON = require("./utilities/india.topo.json");
  const PROJECTION_CONFIG = {
    scale: 350,
    center: [78.9629, 22.5937],
  };
  const COLOR_RANGE = [
    "#D1F2EB",
    "#ABEBC6",
    "#82E0AA",
    "#2ECC71",
    "#2ECC71 ",
    "#239B56",
    "#1D8348",
    "#186A3B ",
  ];

  const DEFAULT_COLOR = "#EEE";

  const geographyStyle = {
    default: {
      outline: "none",
    },
    hover: {
      fill: "#ccc",
      transition: "all 250ms",
      outline: "none",
    },
    pressed: {
      outline: "none",
    },
  };

  const [data, setData] = useState([
    { id: "AP", state: "Andhra Pradesh", value: 0 },
    { id: "AR", state: "Arunachal Pradesh", value: 0 },
    { id: "AS", state: "Assam", value: 0 },
    { id: "BR", state: "Bihar", value: 0 },
    { id: "CT", state: "Chhattisgarh", value: 0 },
    { id: "GA", state: "Goa", value: 0 },
    { id: "GJ", state: "Gujarat", value: 0 },
    { id: "HR", state: "Haryana", value: 0 },
    { id: "HP", state: "Himachal Pradesh", value: 0 },
    { id: "JH", state: "Jharkhand", value: 0 },
    { id: "KA", state: "Karnataka", value: 0 },
    { id: "KL", state: "Kerala", value: 0 },
    { id: "MP", state: "Madhya Pradesh", value: 0 },
    { id: "MH", state: "Maharashtra", value: 0 },
    { id: "MN", state: "Manipur", value: 0 },
    { id: "ML", state: "Meghalaya", value: 0 },
    { id: "MZ", state: "Mizoram", value: 0 },
    { id: "NL", state: "Nagaland", value: 0 },
    { id: "OD", state: "Odisha", value: 0 },
    { id: "PB", state: "Punjab", value: 0 },
    { id: "RJ", state: "Rajasthan", value: 0 },
    { id: "SK", state: "Sikkim", value: 0 },
    { id: "TN", state: "Tamil Nadu", value: 0 },
    { id: "TS", state: "Telangana", value: 0 },
    { id: "TR", state: "Tripura", value: 0 },
    { id: "UK", state: "Uttarakhand", value: 0 },
    { id: "UP", state: "Uttar Pradesh", value: 0 },
    { id: "WB", state: "West Bengal", value: 0 },
    { id: "WB", state: "West Bengal", value: 0 },
    { id: "AN", state: "Andaman and Nicobar Islands", value: 0 },
    { id: "CH", state: "Chandigarh", value: 0 },
    { id: "DN", state: "Dadra and Nagar Haveli", value: 0 },
    { id: "DD", state: "Daman and Diu", value: 0 },
    { id: "DL", state: "Delhi", value: 0 },
    { id: "JK", state: "Jammu and Kashmir", value: 0 },
    { id: "LA", state: "Ladakh", value: 0 },
    { id: "LD", state: "Lakshadweep", value: 0 },
    { id: "PY", state: "Puducherry", value: 0 },
  ]);
  const [tooltipContent, setTooltipContent] = useState("");
  const [states, setStates] = useState([]);
  const [max, setMax] = useState([]);
  const [min, setMin] = useState([]);
  const [sum, setSum] = useState([]);
  const [avg, setAvg] = useState([]);
  const onMouseEnter = (geo, current = { value: "NA" }) => {
    return () => {
      setTooltipContent(`${geo.properties.name}: ${current.value}`);
    };
  };

  const onMouseLeave = () => {
    setTooltipContent("");
  };

  const colorScale = scaleQuantile().domain([0, 50]).range(COLOR_RANGE);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const loadData = () => {
      try {
        axios.get("http://localhost:4000/timeCount").then((res) => {
          timeCount.push({
            id: "Morning",
            label: "Morning",
            value: res.data[0].Morning,
          });
          timeCount.push({
            id: "Afternoon",
            label: "Afternoon",
            value: res.data[0].Afternoon,
          });
          timeCount.push({
            id: "Evening",
            label: "Evening",
            value: res.data[0].Evening,
          });
        });
        axios.get("http://localhost:4000/timeRev").then((res) => {
          timeRev.push({
            id: "Morning",
            label: "Morning",
            value: res.data[0].Morning,
          });
          timeRev.push({
            id: "Afternoon",
            label: "Afternoon",
            value: res.data[0].Afternoon,
          });
          timeRev.push({
            id: "Evening",
            label: "Evening",
            value: res.data[0].Evening,
          });
          setTimeCount([[...timeCount]]);
          setTimeRev([[...timeRev]]);

          axios.get("http://localhost:4000/stateRev").then((res) => {
            let y = [];
            let ma = [],
              mi = [],
              s = [],
              avg = [];
            let st = data;
            res.data.map((x) => {
              if (!y.includes(x.state)) {
                y.push(x.state);
                ma.push(x.max);
                mi.push(x.min);
                s.push(x.sum);
                avg.push(x.avg);
              }
              return null;
            });
            setStates(y);
            setMax(ma);
            setMin(mi);
            setSum(s);
            setAvg(avg);

            y.map((x) => {
              let a = res.data.filter((y) => y.state === x);
              a.map((y) => (st.find((c) => c.state === x).value += y.avg));
              return null;
            });
            setData(st);
            return null;
          });
          return null;
        });
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("cancelled");
        } else {
          throw error;
        }
      }
    };
    loadData();
    return () => {
      source.cancel();
    };
  }, []);
  return (
    <div className="rev">
      <div className="pieContainer" id="timePie">
        {timeCount.map((x, i) => (
          <div key={i} className="pie1">
            <h1>Time wise Count</h1>
            <ResponsivePie
              data={x}
              margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
              innerRadius={0.5}
              padAngle={0.7}
              cornerRadius={3}
              colors={{ scheme: "set3" }}
              borderWidth={1}
              borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
              radialLabelsSkipAngle={10}
              radialLabelsTextColor="#333333"
              radialLabelsLinkColor={{ from: "color" }}
              sliceLabelsSkipAngle={10}
              sliceLabelsTextColor="#333333"
              legends={[
                {
                  anchor: "bottom",
                  direction: "row",
                  justify: false,
                  translateX: 0,
                  translateY: 56,
                  itemsSpacing: 0,
                  itemWidth: 100,
                  itemHeight: 18,
                  itemTextColor: "#999",
                  itemDirection: "left-to-right",
                  itemOpacity: 1,
                  symbolSize: 18,
                  symbolShape: "circle",
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemTextColor: "#000",
                      },
                    },
                  ],
                },
              ]}
            />
          </div>
        ))}
        {timeRev.map((x, i) => (
          <div className="pie1" key={i}>
            <h1>Time wise Total Revenue</h1>
            <ResponsivePie
              data={x}
              margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
              innerRadius={0.5}
              padAngle={0.7}
              cornerRadius={3}
              colors={{ scheme: "nivo" }}
              borderWidth={1}
              borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
              radialLabelsSkipAngle={10}
              radialLabelsTextColor="#333333"
              radialLabelsLinkColor={{ from: "color" }}
              sliceLabelsSkipAngle={10}
              sliceLabelsTextColor="#333333"
              legends={[
                {
                  anchor: "bottom",
                  direction: "row",
                  justify: false,
                  translateX: 0,
                  translateY: 56,
                  itemsSpacing: 0,
                  itemWidth: 100,
                  itemHeight: 18,
                  itemTextColor: "#999",
                  itemDirection: "left-to-right",
                  itemOpacity: 1,
                  symbolSize: 18,
                  symbolShape: "circle",
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemTextColor: "#000",
                      },
                    },
                  ],
                },
              ]}
            />
          </div>
        ))}
        <div id="rev">
          <h1 className="revhead">Trends in Statewise Revenue</h1>
          <table>
            <thead>
              <tr>
                <td>Sno</td>
                <td>State</td>
                <td>Maximum</td>
                <td>Minimum</td>
                <td>Total</td>
                <td>Average</td>
              </tr>
            </thead>
            <tbody>
              {states.map((x, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{x}</td>
                  <td>{max[i]}</td>
                  <td>{min[i]}</td>
                  <td>{sum[i]}</td>
                  <td>{avg[i]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="map">
        <div id="map">
          <h1>Statewise HeatMap of Average Revenue</h1>
          <ReactTooltip>{tooltipContent}</ReactTooltip>
          <ComposableMap
            projectionConfig={PROJECTION_CONFIG}
            projection="geoMercator"
            width={220}
            height={200}
            data-tip=""
          >
            <Geographies geography={INDIA_TOPO_JSON}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const current = data.find((s) => s.id === geo.id);
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={current ? colorScale(current.value) : DEFAULT_COLOR}
                      style={geographyStyle}
                      onMouseEnter={onMouseEnter(geo, current)}
                      onMouseLeave={onMouseLeave}
                    />
                  );
                })
              }
            </Geographies>
          </ComposableMap>
        </div>
      </div>
      <button
        className="print"
        onClick={(e) => {
          const input = document.getElementById("timePie");
          const pdf = new jsPDF();
          var width = pdf.internal.pageSize.getWidth();
          var height = pdf.internal.pageSize.getHeight();
          if (pdf) {
            domtoimage.toPng(input).then((imgData) => {
              pdf.addImage(imgData, "PNG", 0, 70, width, height / 2);
              pdf.addPage();
              domtoimage
                .toPng(document.getElementById("map"))
                .then((imgData) => {
                  pdf.addImage(imgData, "PNG", 5, 10, width - 10, height);
                  pdf.save("download.pdf");
                });
            });
          }
        }}
      >
        <img alt="download" src={download} />
        Download
      </button>
    </div>
  );
}
