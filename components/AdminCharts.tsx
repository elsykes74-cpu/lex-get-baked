'use client';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from 'recharts';

type Order = {
  id: number;
  status: string;
  total: number;
  created_at: string;
};

const STATUS_COLORS: Record<string, string> = {
  pending:   '#C4965A',
  confirmed: '#9B7EBC',
  preparing: '#C9748F',
  ready:     '#6B8C7A',
  delivered: '#4CAF7D',
  cancelled: '#888888',
};

function getLast7Days(orders: Order[]) {
  const days: { day: string; revenue: number; count: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    const label = d.toLocaleDateString('en-US', { weekday: 'short' });
    const dayOrders = orders.filter(o => o.created_at.slice(0, 10) === key && o.status !== 'cancelled');
    days.push({ day: label, revenue: dayOrders.reduce((s, o) => s + (o.total ?? 0), 0), count: dayOrders.length });
  }
  return days;
}

function getStatusBreakdown(orders: Order[]) {
  const counts: Record<string, number> = {};
  orders.forEach(o => { counts[o.status] = (counts[o.status] ?? 0) + 1; });
  return Object.entries(counts)
    .filter(([, v]) => v > 0)
    .map(([status, value]) => ({ status, value, color: STATUS_COLORS[status] ?? '#ccc' }));
}

const CustomBar = (props: { x?: number; y?: number; width?: number; height?: number; value?: number }) => {
  const { x = 0, y = 0, width = 0, height = 0 } = props;
  if (height <= 0) return null;
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} rx={4} ry={4}
        fill="url(#barGrad)" opacity={0.9} />
    </g>
  );
};

export default function AdminCharts({ orders }: { orders: Order[] }) {
  const revenueData  = getLast7Days(orders);
  const statusData   = getStatusBreakdown(orders);
  const hasRevenue   = revenueData.some(d => d.revenue > 0);
  const hasStatus    = statusData.length > 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">

      {/* Revenue chart */}
      <div className="glass-card rounded-[20px] overflow-hidden">
        <div className="h-0.5 w-full" style={{ background: 'linear-gradient(90deg, #C4965A44, #C4965A)' }} />
        <div className="p-4">
          <p className="text-[11px] tracking-[0.14em] uppercase font-bold text-muted mb-3">Revenue — Last 7 Days</p>
          {hasRevenue ? (
            <ResponsiveContainer width="100%" height={120}>
              <BarChart data={revenueData} margin={{ top: 0, right: 0, left: -28, bottom: 0 }}>
                <defs>
                  <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#C9748F" />
                    <stop offset="100%" stopColor="#D4956A" />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: 'rgba(47,35,67,0.45)', fontWeight: 600 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 9, fill: 'rgba(47,35,67,0.35)' }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}`} />
                <Tooltip
                  cursor={{ fill: 'rgba(47,35,67,0.05)', radius: 6 }}
                  contentStyle={{ background: 'rgba(255,255,255,0.95)', border: '1px solid rgba(47,35,67,0.08)', borderRadius: 12, fontSize: 11, boxShadow: '0 4px 16px rgba(47,35,67,0.08)' }}
                  formatter={(v: any) => [`$${Number(v).toFixed(2)}`, 'Revenue']}
                />
                <Bar dataKey="revenue" shape={<CustomBar />} maxBarSize={28} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[120px] flex items-center justify-center">
              <p className="text-[12px] text-muted">No revenue data yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Status donut */}
      <div className="glass-card rounded-[20px] overflow-hidden">
        <div className="h-0.5 w-full" style={{ background: 'linear-gradient(90deg, #9B7EBC44, #9B7EBC)' }} />
        <div className="p-4">
          <p className="text-[11px] tracking-[0.14em] uppercase font-bold text-muted mb-3">Orders by Status</p>
          {hasStatus ? (
            <div className="flex items-center gap-4">
              <ResponsiveContainer width={110} height={110}>
                <PieChart>
                  <Pie data={statusData} cx="50%" cy="50%" innerRadius={30} outerRadius={48}
                    dataKey="value" paddingAngle={3} strokeWidth={0}>
                    {statusData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} opacity={0.85} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ background: 'rgba(255,255,255,0.95)', border: '1px solid rgba(47,35,67,0.08)', borderRadius: 12, fontSize: 11, boxShadow: '0 4px 16px rgba(47,35,67,0.08)' }}
                    formatter={(v: any) => [v, '']}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex-1 space-y-1.5">
                {statusData.map(({ status, value, color }) => (
                  <div key={status} className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
                      <span className="text-[11px] font-medium text-plum/70 capitalize">{status}</span>
                    </div>
                    <span className="text-[11px] font-bold text-plum">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="h-[110px] flex items-center justify-center">
              <p className="text-[12px] text-muted">No orders yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
