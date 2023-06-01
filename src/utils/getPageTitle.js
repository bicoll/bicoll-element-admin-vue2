import setting from '@/setting'

/**
 * 作用：将路由标题和应用标题进行结合形成页面标题，例如：login-bicoll element admin
 * @param title 路由标题
 */
export default function getPageTitle(title) {
    if (title) {
        return `${title} - ${setting.title}`
    }
    return title
}
