
/**
 * اعتبارسنجی شماره تلفن ایرانی
 * @param phoneNumber شماره تلفن ورودی
 * @returns boolean نشان دهنده معتبر بودن یا نبودن شماره
 */
export const validateIranianPhone = (phoneNumber: string): boolean => {
  // حذف همه کاراکترهای غیر عددی
  const cleanedPhone = phoneNumber.replace(/\D/g, '');
  
  // الگوهای قابل قبول:
  // 09xxxxxxxxx - 11 رقم که با 09 شروع می‌شود
  // +989xxxxxxxxx - با +989 شروع می‌شود (12 رقم پس از حذف +)
  // 00989xxxxxxxxx - با 00989 شروع می‌شود (14 رقم)
  
  // بررسی طول شماره
  if (cleanedPhone.length < 10 || cleanedPhone.length > 14) {
    return false;
  }
  
  // بررسی بر اساس الگوهای مختلف
  if (cleanedPhone.startsWith('9') && cleanedPhone.length === 10) {
    // فرمت: 9xxxxxxxxx (10 رقمی)
    return /^9\d{9}$/.test(cleanedPhone);
  } else if (cleanedPhone.startsWith('09') && cleanedPhone.length === 11) {
    // فرمت: 09xxxxxxxxx (11 رقمی)
    return /^09\d{9}$/.test(cleanedPhone);
  } else if (cleanedPhone.startsWith('989') && cleanedPhone.length === 12) {
    // فرمت: 989xxxxxxxxx (12 رقمی - بدون +)
    return /^989\d{9}$/.test(cleanedPhone);
  } else if (cleanedPhone.startsWith('00989') && cleanedPhone.length === 14) {
    // فرمت: 00989xxxxxxxxx (14 رقمی)
    return /^00989\d{9}$/.test(cleanedPhone);
  }
  
  return false;
};
