import React, { useState, useEffect } from "react";
import axios from "axios";
import { ResponsiveBar } from "@nivo/bar";
import download from "../images/download-button.png";
import domtoimage from "dom-to-image";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import ReactTooltip from "react-tooltip";

import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleQuantile } from "d3-scale";
import { states, cities } from "./utilities/cities";
export default function UserStats() {
  const [res, setRes] = useState([]);
  const color = ["paired", "nivo", "accent", "dark2", "pastel1"];

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

  const [data1, setData1] = useState([
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
    { id: "AN", state: "Andaman and Nicobar Islands", value: 0 },
    { id: "CH", state: "Chandigarh", value: 0 },
    { id: "DN", state: "Dadra and Nagar Haveli", value: 0 },
    { id: "DD", state: "Daman and Diu", value: 0 },
    { id: "DL", state: "Delhi", value: 0 },
    { id: "JK", state: "Jammu and Kashmir", value: 0 },
    { id: "LD", state: "Lakshadweep", value: 0 },
    { id: "PY", state: "Puducherry", value: 0 },
  ]);

  const [tooltipContent, setTooltipContent] = useState("");
  const onMouseEnter = (geo, current = { value: "NA" }) => {
    return () => {
      setTooltipContent(`${geo.properties.name}: ${current.value}`);
    };
  };

  const onMouseLeave = () => {
    setTooltipContent("");
  };

  const colorScale = scaleQuantile().domain([0, 1, 2, 3, 4]).range(COLOR_RANGE);
  const colorScale1 = scaleQuantile().domain([0, 300]).range(COLOR_RANGE);
  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const loadData = () => {
      try {
        axios.get("http://localhost:4000/userCity").then((res) => {
          let y = [];
          let z = [];
          let st = data;
          res.data.map((x) => {
            z.push(x.city);
            if (!y.includes(x.state)) y.push(x.state);
            return null;
          });
          let t = [];
          y.map((x) => {
            let a = res.data.filter((y) => y.state === x);
            let b = { state: x, data: [] };
            a.map((y) => {
              b.data.push({
                city: y.city,
                count: y.count,
              });
              st.find((c) => c.state === x).value += y.count;
              return null;
            });
            t.push(b);
            return null;
          });
          setData(st);
          setRes(t);
          data1.map((x) => {
            let i = states.indexOf(states.find((y) => y === x.state));
            let c = 0;
            if (i === -1) c = cities[2].split("|").length / 2;
            else if (i === 2) c = cities[2].split("|").length / 2;
            else c = cities[i].split("|").length;
            x.value = c;
            return null;
          });
        });
        setData1(data1);
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
  }, [data1, data]);
  return (
    <div>
      <div className="userStats">
        <div id="userStats">
          {res.map((x, i) => (
            <div key={i} className="stateChart">
              <h3>{x.state}</h3>
              <ResponsiveBar
                data={res[i].data}
                keys={["count"]}
                indexBy="city"
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                padding={0.3}
                groupMode="grouped"
                valueScale={{ type: "linear" }}
                colors={{ scheme: color[i % 5] }}
                borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: "City",
                  legendPosition: "middle",
                  legendOffset: 32,
                }}
                axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: "Count",
                  legendPosition: "middle",
                  legendOffset: -40,
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
                legends={[
                  {
                    dataFrom: "keys",
                    anchor: "bottom-right",
                    direction: "column",
                    justify: false,
                    translateX: 120,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: "left-to-right",
                    itemOpacity: 0.85,
                    symbolSize: 20,
                    effects: [
                      {
                        on: "hover",
                        style: {
                          itemOpacity: 1,
                        },
                      },
                    ],
                  },
                ]}
                animate={true}
                motionStiffness={90}
                motionDamping={15}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="map1">
        <div id="map">
          <h1>Statewise Chloropleth of User Population</h1>
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
      <div className="map1">
        <div id="map1">
          <h1>Statewise Chloropleth of Number of FPS</h1>
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
                  const current = data1.find((s) => s.id === geo.id);
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={
                        current ? colorScale1(current.value) : DEFAULT_COLOR
                      }
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
          const input = document.getElementById("userStats");
          const pdf = new jsPDF();
          var width = pdf.internal.pageSize.getWidth();
          var height = pdf.internal.pageSize.getHeight();
          if (pdf) {
            domtoimage.toPng(input).then((imgData) => {
              pdf.addImage(imgData, "PNG", 10, 50, width - 10, height / 3 + 50);
              pdf.addPage();

              domtoimage
                .toPng(document.getElementById("map"))
                .then((imgData) => {
                  pdf.addImage(imgData, "PNG", 5, 10, width - 10, height);
                  pdf.addPage();
                  domtoimage
                    .toPng(document.getElementById("map1"))
                    .then((imgData) => {
                      pdf.addImage(imgData, "PNG", 5, 10, width - 10, height);
                      pdf.save("download.pdf");
                    });
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
