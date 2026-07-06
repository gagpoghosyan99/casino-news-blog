/** rel attribute for outbound affiliate /go/* links */
export const AFFILIATE_LINK_REL = "nofollow sponsored";

export function isAffiliateGoHref(href: string): boolean {
  return href.startsWith("/go/");
}
