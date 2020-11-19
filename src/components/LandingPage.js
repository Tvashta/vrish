import React, { useEffect, useState } from "react";
import axios from "axios";
import { ResponsiveLine } from "@nivo/line";
import { ResponsivePie } from "@nivo/pie";
import download from "../images/download-button.png";
import domtoimage from "dom-to-image";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
function LandingPage(props) {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const [monthly, setMonthly] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [transC, setTransC] = useState({
    id: "Transactions",
    data: [],
  });
  const [item, setItem] = useState([]);
  const [trans, setTrans] = useState([{ x: 0, y: 0 }]);
  const [flag, setFlag] = useState(false);
  const [prodCons, setProdCons] = useState([]);
  const [items, setItems] = useState([]);
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const loadData = () => {
      try {
        // setMonthly([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        // setTransC({
        //   id: "Transactions",
        //   data: [],
        // });
        // setItem([]);
        // setTrans([{ x: 0, y: 0 }]);
        let path = "http://localhost:4000/prodCard/" + props.user.income_range;
        axios.get(path).then(function (res) {
          res.data.map((x) => item.push(x.name));
          setItems([]);
          setProdCons([]);
          let path = "http://localhost:4000/trans/" + props.user.user_id;
          axios.get(path).then(function (res) {
            setTransactions(res.data);
            res.data.map((x, i) => trans.push({ x: i + 1, y: x.amt }));
            res.data.filter(
              (x) => new Date(Date.parse(x.date)).getUTCFullYear() === 2020
            );
            res.data.map((x) => {
              let d = new Date(Date.parse(x.date)).getUTCMonth();
              monthly[d] += 1;
              return null;
            });
          });
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
  }, [props.user, item, monthly, trans]);

  function makeData() {
    monthly.map(
      (a, i) => (transC.data = [...transC.data, { x: monthNames[i], y: a }])
    );
    let prod = [];
    let items1 = [];
    let path = "http://localhost:4000/prodCons/" + props.user.user_id;
    axios.get(path).then((res) => {
      res.data.map((x) => {
        if (!items1.includes(x.name)) {
          items1.push(x.name);
          prod.push([
            {
              id: "Consumed [%]",
              label: "Consumed [%]",
              value: x.pcons,
            },
            {
              id: "Left [%]",
              label: "Left [%]",
              value: 100 - x.pcons,
            },
          ]);
        }

        return null;
      });

      item.map((x) => {
        if (!items1.includes(x)) {
          items1.push(x);
          prod.push([
            {
              id: "Consumed [%]",
              label: "Consumed [%]",
              value: 100,
            },
          ]);
        }
        return null;
      });
      setItems(items1);
      setProdCons(prod);
      setFlag(true);
    });
  }

  return (
    <div className="land">
      <div>
        <section
          id="top-sec"
          className="d-flex flex-column justify-content-between"
        >
          <div>
            <h1 className="d-inline float-right" id="home-head">
              <strong>Welcome {props.user.uname}</strong>
            </h1>
          </div>
          <div>
            <div className="container">
              <div className="row">
                <div className="col">
                  <button
                    className="btn btn-link btn-block arrowbtn"
                    type="button"
                    onClick={makeData}
                  >
                    <i
                      className="icon ion-chevron-down"
                      style={{ fontSize: "40px" }}
                    ></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <script src="assets/js/jquery.min.js"></script>
        <script src="assets/bootstrap/js/bootstrap.min.js"></script>
        <script src="https://unpkg.com/@bootstrapstudio/bootstrap-better-nav/dist/bootstrap-better-nav.min.js"></script>
      </div>
      {flag && (
        <div>
          <div className="stats" id="stats">
            <div id="charts">
              <h1>Consumption Statistics</h1>
              <div className="chart" id="chart1">
                <ResponsiveLine
                  data={[transC]}
                  margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                  xScale={{ type: "point" }}
                  yScale={{
                    type: "linear",
                    min: "auto",
                    max: "auto",
                    stacked: true,
                    reverse: false,
                  }}
                  yFormat=" >-.2f"
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                    orient: "bottom",
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "Month",
                    legendOffset: 36,
                    legendPosition: "middle",
                  }}
                  axisLeft={{
                    orient: "left",
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "Count",
                    legendOffset: -40,
                    legendPosition: "middle",
                  }}
                  colors={{ scheme: "set2" }}
                  pointSize={10}
                  pointColor={{ theme: "background" }}
                  pointBorderWidth={2}
                  pointBorderColor={{ from: "serieColor" }}
                  pointLabelYOffset={-12}
                  useMesh={true}
                  legends={[
                    {
                      anchor: "bottom-right",
                      direction: "column",
                      justify: false,
                      translateX: 100,
                      translateY: 0,
                      itemsSpacing: 0,
                      itemDirection: "left-to-right",
                      itemWidth: 80,
                      itemHeight: 20,
                      itemOpacity: 0.75,
                      symbolSize: 12,
                      symbolShape: "circle",
                      symbolBorderColor: "rgba(0, 0, 0, .5)",
                      effects: [
                        {
                          on: "hover",
                          style: {
                            itemBackground: "rgba(0, 0, 0, .03)",
                            itemOpacity: 1,
                          },
                        },
                      ],
                    },
                  ]}
                />
              </div>
              <div className="chart" id="chart2">
                <ResponsiveLine
                  data={[{ id: "Amount", data: trans }]}
                  margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                  xScale={{ type: "point" }}
                  yScale={{
                    type: "linear",
                    min: "auto",
                    max: "auto",
                    stacked: true,
                    reverse: false,
                  }}
                  yFormat=" >-.2f"
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                    orient: "bottom",
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "Transaction Id",
                    legendOffset: 36,
                    legendPosition: "middle",
                  }}
                  axisLeft={{
                    orient: "left",
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "Amount",
                    legendOffset: -40,
                    legendPosition: "middle",
                  }}
                  colors={{ scheme: "accent" }}
                  pointSize={10}
                  pointColor={{ theme: "background" }}
                  pointBorderWidth={2}
                  pointBorderColor={{ from: "serieColor" }}
                  pointLabelYOffset={-12}
                  useMesh={true}
                  legends={[
                    {
                      anchor: "bottom-right",
                      direction: "column",
                      justify: false,
                      translateX: 100,
                      translateY: 0,
                      itemsSpacing: 0,
                      itemDirection: "left-to-right",
                      itemWidth: 80,
                      itemHeight: 20,
                      itemOpacity: 0.75,
                      symbolSize: 12,
                      symbolShape: "circle",
                      symbolBorderColor: "rgba(0, 0, 0, .5)",
                      effects: [
                        {
                          on: "hover",
                          style: {
                            itemBackground: "rgba(0, 0, 0, .03)",
                            itemOpacity: 1,
                          },
                        },
                      ],
                    },
                  ]}
                />
              </div>

              <div id="pie">
                <h2>Item Wise Consumption</h2>
                <div className="pieContainer">
                  {prodCons.map((x, i) => (
                    <div className="pie" key={i}>
                      <h1>{items[i]}</h1>
                      <ResponsivePie
                        data={x}
                        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                        innerRadius={0.5}
                        padAngle={0.7}
                        cornerRadius={3}
                        colors={{ scheme: "set1" }}
                        borderWidth={1}
                        borderColor={{
                          from: "color",
                          modifiers: [["darker", 0.2]],
                        }}
                        radialLabelsSkipAngle={10}
                        radialLabelsTextColor="#333333"
                        radialLabelsLinkColor={{ from: "color", modifiers: [] }}
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
                </div>
              </div>
            </div>
            <hr className="horLine" />
            <div>
              <h2>Transaction Statement</h2>
              <table className="trans" id="trans">
                <thead>
                  <tr>
                    <td>Sno</td>
                    <td>Date/Time of Transaction</td>
                    <td>Amount [In Rs]</td>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((x, i) => (
                    <tr key={i}>
                      <td>{i}</td>
                      <td>{new Date(Date.parse(x.date)).toLocaleString()}</td>
                      <td>{x.amt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <button
            className="print"
            onClick={(e) => {
              const input = document.getElementById("charts");
              const pdf = new jsPDF();
              var width = pdf.internal.pageSize.getWidth();
              var height = pdf.internal.pageSize.getHeight();
              if (pdf) {
                domtoimage.toPng(input).then((imgData) => {
                  pdf.addImage(imgData, "PNG", 0, 15, width, height - 30);
                  pdf.addPage();
                  pdf.setLineWidth(2);
                  pdf.text(20, 20, "Transaction Details");
                  pdf.autoTable({ html: "#trans", startY: 30 });
                  pdf.save("download.pdf");
                });
              }
            }}
          >
            <img alt="download" src={download} />
            Download
          </button>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
