export function searchSVGs(svgs: string[], query: string): string[] {
    return svgs.filter(svg => svg.toLowerCase().includes(query.toLowerCase()));
}
