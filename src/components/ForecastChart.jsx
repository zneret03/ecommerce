import {
  AreaChart,
  CartesianGrid,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

export default function ForecastChart({ data, y1, y2, xAxis }) {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          {payload.map((i, index) => {
            if (index === 0) {
              return (
                <div className="bg-orange-500/[0.9] rounded p-2 flex flex-col items-center">
                  <p className="label text-white">₱ {i.value.toLocaleString()}</p>
                  <p className="text-white/[.9] text-sm">{label}</p>
                </div>
              )
            }
            return
          })}

        </div>
      );
    }

    return null;
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}
        margin={{ top: 5, right: 20, bottom: 50, left: 0 }}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey={xAxis} />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip wrapperStyle={{ outline: "none" }} cursor={{ fill: 'transparent' }} content={<CustomTooltip />} />
        <Area type="monotone" dataKey={y1} stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
        <Area type="monotone" dataKey={y2} stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}