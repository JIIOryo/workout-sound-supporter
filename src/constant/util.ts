/**
 * HTTPメソッド
 */
export const HTTP_METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
} as const

/** HTTPメソッドのrouter keyのパスとメソッドの区切り文字 */
export const HTTP_METHOD_PATH_DELIMITER = ':'

/** HTTPのパスの区切り文字 */
export const HTTP_PATH_DELIMITER = '/'
