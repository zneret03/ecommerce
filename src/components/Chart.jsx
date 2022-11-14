import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts'
import {useState} from 'react'

export default function Chart({ data, yAxis, xAxis }) {
  const [focusBar, setFocusBar] = useState(null)

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          {payload.map(i => (
            <div className="bg-orange-500/[0.9] rounded p-2">
              <p className="label text-white">₱ {i.value.toLocaleString()}</p>
            </div>
          ))}

        </div>
      );
    }

    return null;
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 5, right: 20, bottom: 50, left: 0 }} onMouseMove={state => {
        if (state.isTooltipActive) {
          setFocusBar(state.activeTooltipIndex);
        } else {
          setFocusBar(null);
        }
      }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#DFE2E6" verticalPoints={[0]} />
        <XAxis dataKey={xAxis} />
        <YAxis />
        <Tooltip wrapperStyle={{ outline: "none" }} cursor={{ fill: 'transparent' }} content={<CustomTooltip />} />
        <Bar type="monotone" dataKey={yAxis} fill="#F97316" barSize={8}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={focusBar === index ? '#F97316' : '#fc9044'}/>
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}