import React, { useState, useEffect } from "react";
import axios from "axios";
import { ResponsiveBar } from "@nivo/bar";
import download from "../images/download-button.png";
import domtoimage from "dom-to-image";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

export default function Gender() {
  const [res, setRes] = useState([]);

  const [maxs, setMaxs] = useState([0, 0, 0]);
  const [mins, setMins] = useState(["", "", ""]);
  const [sums, setSums] = useState([0, 0, 0]);
  const [maxv, setmaxv] = useState([0, 0, 0]);
  const [minv, setminv] = useState([Infinity, Infinity, Infinity]);
  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const loadData = () => {
      try {
        var fmin, mmin, tmin, fm, tm, mm;
        fmin = mmin = tmin = Infinity;
        fm = tm = mm = 0;
        axios.get("http://localhost:4000/userGender").then(function (res) {
          let st = {};
          res.data.map((x) => {
            st = {
              ...st,
              [x.state]: [],
            };
            return null;
          });
          res.data.map((x) => st[x.state].push({ [x.sex]: x.count }));
          let state = [];
          Object.keys(st).map((x) => {
            let s = {
              state: x,
            };
            st[x].map((y) => (s = { ...s, ...y }));
            if (s.T === undefined) s.T = 0;
            if (s.F === undefined) s.F = 0;
            if (s.M === undefined) s.M = 0;
            if (s.M > mm) {
              mm = s.M;
              maxs[1] = s.state;
            }
            if (s.F > fm) {
              fm = s.F;
              maxs[0] = s.state;
            }
            if (s.T > tm) {
              tm = s.T;
              maxs[2] = s.state;
            }
            if (s.M < mmin) {
              mmin = s.M;
              mins[1] = s.state;
            }
            if (s.F < fmin) {
              fmin = s.F;
              mins[0] = s.state;
            }
            if (s.T < tmin) {
              tmin = s.T;
              mins[2] = s.state;
            }
            sums[0] += s.F;
            sums[1] += s.M;
            sums[2] += s.T;
            setmaxv([fm, mm, tm]);
            setminv([fmin, mmin, tmin]);
            state.push(s);
            return null;
          });
          setRes(state);
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
    <div className="admin">
      <div className="chart" id="genderbar">
        <h2>Gender Statistics</h2>
        <ResponsiveBar
          data={res}
          keys={["F", "M", "T"]}
          indexBy="state"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          groupMode="grouped"
          valueScale={{ type: "linear" }}
          colors={{ scheme: "paired" }}
          borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "State",
            legendPosition: "middle",
            legendOffset: 32,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Gender",
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
      <div className="trans">
        <table id="gender">
          <thead>
            <tr>
              <td>Measure</td>
              <td>Female</td>
              <td>Male</td>
              <td>Transgender</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Max</td>
              <td>{maxs[0]}</td>
              <td>{maxs[1]}</td>
              <td>{maxs[2]}</td>
            </tr>
            <tr>
              <td>Max Value</td>
              <td>{maxv[0]}</td>
              <td>{maxv[1]}</td>
              <td>{maxv[2]}</td>
            </tr>
            <tr>
              <td>Min</td>
              <td>{mins[0]}</td>
              <td>{mins[1]}</td>
              <td>{mins[2]}</td>
            </tr>
            <tr>
              <td>Min Value</td>
              <td>{minv[0]}</td>
              <td>{minv[1]}</td>
              <td>{minv[2]}</td>
            </tr>
            <tr>
              <td>Total</td>
              <td>{sums[0]}</td>
              <td>{sums[1]}</td>
              <td>{sums[2]}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button
        className="print"
        onClick={(e) => {
          const input = document.getElementById("genderbar");
          const pdf = new jsPDF();
          var width = pdf.internal.pageSize.getWidth();
          var height = pdf.internal.pageSize.getHeight();
          if (pdf) {
            domtoimage.toPng(input).then((imgData) => {
              pdf.addImage(imgData, "PNG", 0, 50, width, height / 3 + 50);
              pdf.addPage();
              pdf.setLineWidth(2);
              pdf.text(20, 20, "Trends");
              pdf.autoTable({ html: "#gender", startY: 30 });
              pdf.save("download.pdf");
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
