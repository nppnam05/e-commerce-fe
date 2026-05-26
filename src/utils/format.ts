export const formatVND = (value: number | string): string => {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(num)) return '0 VND';

  const formattedNumber = new Intl.NumberFormat('vi-VN', {
    style: 'decimal',
  }).format(num);
 
  return `${formattedNumber} VND`;
};