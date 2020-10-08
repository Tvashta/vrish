import React from "react";
import { PieChart } from "react-minimal-pie-chart";
import { Table } from "react-bootstrap";
function LandingPage(props) {
  const { user, items } = props;
  return (
    <div className="userscreen">
      <h1 className="center">Welcome {user.name}</h1>
      <table>
        <tbody>
          <tr>
            <td>
              <div className="pieChart">
                <PieChart
                  style={{
                    fontFamily:
                      '"Nunito Sans", -apple-system, Helvetica, Arial, sans-serif',
                    fontSize: "8px",
                  }}
                  data={[
                    { title: "Product Consumed", value: 10, color: "#E38627" },
                    { title: "Product Left", value: 15, color: "#C13C37" },
                  ]}
                  lineWidth={60}
                  segmentsStyle={{
                    transition: "stroke .3s",
                    cursor: "pointer",
                  }}
                  segmentsShift={1}
                  animate
                  radius={PieChart.defaultProps.radius - 6}
                  label={({ dataEntry }) =>
                    Math.round(dataEntry.percentage) + "%"
                  }
                  labelPosition={70}
                  labelStyle={{
                    fill: "#fff",
                    opacity: 0.75,
                    pointerEvents: "none",
                  }}
                />

                <div
                  className="pieColor"
                  style={{ background: "#E38627" }}
                ></div>
                <p className="inline">Products Consumed</p>
                <br />
                <div
                  className="pieColor"
                  style={{ background: "#C13C37" }}
                ></div>
                <p className="inline">Products Left</p>
              </div>
            </td>
            <td>
              <h2 className="center">Products For the Month</h2>
              <Table bordered hover>
                <thead>
                  <tr>
                    <th>S No</th>
                    <th>Item Name</th>
                    <th>Amount Consumed</th>
                    <th>Amount Left</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((i, e) => (
                    <tr key={e}>
                      <td className="center">{e + 1}</td>
                      <td className="center">{i.name}</td>
                      <td className="center">{i.qtyConsumed}</td>
                      <td className="center">
                        {i.allowedQuantity - i.qtyConsumed}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default LandingPage;
