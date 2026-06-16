import MainInstance from "@/services/main.instance";
import { MENU } from "@/services/constants";

const HomeService = {
  getHome(slug: string, guestCode?: string) {
    const params = guestCode ? { params: { to: guestCode } } : null;
    return MainInstance.fetch(MENU.GET_HOME, slug, params);
  },
  postPresence(data: any, secureId: any) {
    return MainInstance.create(MENU.HADIR, secureId, data, null);
  },
  postPresence2(data: any, secureId: any) {
    return MainInstance.create(MENU.HADIR2, secureId, data, null);
  },
  postWishes(data: any, secureId: any) {
    return MainInstance.create(MENU.UCAPAN, secureId, data, null);
  },
};

export default HomeService;
