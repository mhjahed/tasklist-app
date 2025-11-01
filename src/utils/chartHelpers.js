export const drawBarChart = (canvas, data, options = {}) => {
  const ctx = canvas.getContext('2d');
  const { width, height } = canvas;
  
  const {
    barColor = '#3b82f6',
    backgroundColor = '#f3f4f6',
    textColor = '#1f2937',
    padding = 40,
    maxValue = Math.max(...data.map(d => d.value))
  } = options;

  // Clear canvas
  ctx.clearRect(0, 0, width, height);
  
  // Draw background
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, width, height);

  const chartWidth = width - (padding * 2);
  const chartHeight = height - (padding * 2);
  const barWidth = chartWidth / data.length;

  // Draw bars
  data.forEach((item, index) => {
    const barHeight = (item.value / maxValue) * chartHeight;
    const x = padding + (index * barWidth);
    const y = height - padding - barHeight;

    // Draw bar
    ctx.fillStyle = barColor;
    ctx.fillRect(x + 5, y, barWidth - 10, barHeight);

    // Draw value on top
    ctx.fillStyle = textColor;
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(item.value, x + barWidth / 2, y - 5);

    // Draw label
    ctx.save();
    ctx.translate(x + barWidth / 2, height - padding + 15);
    ctx.fillText(item.label, 0, 0);
    ctx.restore();
  });
};

export const drawLineChart = (canvas, data, options = {}) => {
  const ctx = canvas.getContext('2d');
  const { width, height } = canvas;
  
  const {
    lineColor = '#3b82f6',
    backgroundColor = '#f3f4f6',
    textColor = '#1f2937',
    padding = 40,
    maxValue = Math.max(...data.map(d => d.value))
  } = options;

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, width, height);

  const chartWidth = width - (padding * 2);
  const chartHeight = height - (padding * 2);
  const pointSpacing = chartWidth / (data.length - 1 || 1);

  // Draw line
  ctx.beginPath();
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = 3;

  data.forEach((item, index) => {
    const x = padding + (index * pointSpacing);
    const y = height - padding - ((item.value / maxValue) * chartHeight);

    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }

    // Draw points
    ctx.fillStyle = lineColor;
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fill();

    // Draw labels
    ctx.fillStyle = textColor;
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(item.label, x, height - padding + 15);
    ctx.fillText(item.value, x, y - 10);
  });

  ctx.stroke();
};

export const drawPieChart = (canvas, data, options = {}) => {
  const ctx = canvas.getContext('2d');
  const { width, height } = canvas;
  
  const {
    colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'],
    backgroundColor = '#f3f4f6',
    textColor = '#1f2937'
  } = options;

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, width, height);

  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 3;

  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = -Math.PI / 2;

  data.forEach((item, index) => {
    const sliceAngle = (item.value / total) * Math.PI * 2;

    // Draw slice
    ctx.beginPath();
    ctx.fillStyle = colors[index % colors.length];
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
    ctx.closePath();
    ctx.fill();

    // Draw label
    const labelAngle = currentAngle + sliceAngle / 2;
    const labelX = centerX + Math.cos(labelAngle) * (radius + 30);
    const labelY = centerY + Math.sin(labelAngle) * (radius + 30);

    ctx.fillStyle = textColor;
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${item.label} (${item.value})`, labelX, labelY);

    currentAngle += sliceAngle;
  });
};