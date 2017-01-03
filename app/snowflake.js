const React = require('react')

module.exports = React.createClass({
  render () {
    return <img src='data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjY0cHgiIGhlaWdodD0iNjRweCIgdmlld0JveD0iMCAwIDM2LjI4MyAzNi4yODMiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDM2LjI4MyAzNi4yODM7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8cGF0aCBkPSJNMzUuNTMxLDE3LjM5MWgtMy4wOWwwLjg0NS0xLjQ2NGMwLjIwNy0wLjM1OSwwLjA4My0wLjgxNy0wLjI3NC0xLjAyNGMtMC4zNTctMC4yMDctMC44MTYtMC4wODUtMS4wMjMsMC4yNzRsLTEuMjc2LDIuMjE0ICAgaC0yLjEwM2wyLjUxNS00LjM1NGMwLjIwNy0wLjM1OCwwLjA4NC0wLjgxNy0wLjI3Mi0xLjAyNGMtMC4zNTctMC4yMDctMC44MTgtMC4wODQtMS4wMjQsMC4yNzRsLTIuOTQ4LDUuMTA0aC0yLjAyMyAgIGMtMC4yMTMtMS45MTgtMS4yMzMtMy41OTEtMi43MTMtNC42ODRsMS4wMTktMS43Nmw1Ljg5Ni0wLjAwMmMwLjQxNCwwLDAuNzUtMC4zMzYsMC43NS0wLjc1YzAtMC40MTQtMC4zMzYtMC43NS0wLjc1LTAuNzUgICBsLTUuMDI5LDAuMDAybDEuMDUxLTEuODJsMi41NTcsMC4wMDJsMCwwYzAuNDEzLDAsMC43NS0wLjMzNiwwLjc1LTAuNzVjMC0wLjQxNC0wLjMzNC0wLjc1LTAuNzUtMC43NWwtMS42ODktMC4wMDJsMS41NDUtMi42NzYgICBjMC4yMDctMC4zNTgsMC4wODQtMC44MTctMC4yNzMtMS4wMjRTMjYuNCwyLjM0MywyNi4xOTMsMi43MDFsLTEuNTQ3LDIuNjc2bC0wLjg0NC0xLjQ2M2MtMC4yMDctMC4zNTgtMC42NjgtMC40ODItMS4wMjMtMC4yNzQgICBjLTAuMzU4LDAuMjA3LTAuNDgxLDAuNjY2LTAuMjc0LDEuMDI0bDEuMjc4LDIuMjEzbC0xLjA1MSwxLjgxOGwtMi41MTQtNC4zNTRjLTAuMjA3LTAuMzU4LTAuNjY2LTAuNDgxLTEuMDI0LTAuMjc0ICAgYy0wLjM1OCwwLjIwNy0wLjQ4MSwwLjY2Ni0wLjI3NCwxLjAyNGwyLjk0Niw1LjEwNGwtMS4wMTYsMS43NThjLTAuODI4LTAuMzY1LTEuNzQzLTAuNTctMi43MDYtMC41NyAgIGMtMC45NjIsMC0xLjg3NywwLjIwNS0yLjcwNywwLjU2OGwtMS4wMTMtMS43NTRsMi45NDYtNS4xMDVjMC4yMDctMC4zNTgsMC4wODQtMC44MTctMC4yNzQtMS4wMjQgICBjLTAuMzU4LTAuMjA4LTAuODE4LTAuMDg0LTEuMDI0LDAuMjc0TDEzLjU2LDguNjk3bC0xLjA1LTEuODE4bDEuMjc4LTIuMjE3YzAuMjA3LTAuMzU4LDAuMDg0LTAuODE2LTAuMjc0LTEuMDIzICAgYy0wLjM2LTAuMjA4LTAuODE4LTAuMDg1LTEuMDI0LDAuMjczbC0wLjg0NSwxLjQ2NWwtMS41NTEtMi42NzhDOS44ODcsMi4zNDIsOS40MjcsMi4yMTksOS4wNywyLjQyNiAgIEM4LjcxMSwyLjYzMyw4LjU4OSwzLjA5Miw4Ljc5NiwzLjQ0OWwxLjU0NSwyLjY3OEg4LjY1MmMtMC40MTQsMC0wLjc1LDAuMzM2LTAuNzUsMC43NWMwLDAuNDE0LDAuMzM2LDAuNzUsMC43NSwwLjc1aDIuNTU2ICAgbDEuMDUsMS44MThINy4yMzFjLTAuNDE0LDAtMC43NSwwLjMzNi0wLjc1LDAuNzVjMCwwLjQxNCwwLjMzNiwwLjc1LDAuNzUsMC43NWg1Ljg5NGwxLjAxNywxLjc2MiAgIGMtMS40NzgsMS4wOTItMi40OTksMi43NjYtMi43MTIsNC42ODRIOS40MDZsLTIuOTUtNS4xMDRjLTAuMjA4LTAuMzYtMC42NjctMC40ODEtMS4wMjUtMC4yNzRzLTAuNDgxLDAuNjY2LTAuMjc0LDEuMDI0ICAgbDIuNTE2LDQuMzU0SDUuNTY5bC0xLjI3Ny0yLjIxM2MtMC4yMDctMC4zNTktMC42NjctMC40OC0xLjAyNC0wLjI3M2MtMC4zNTksMC4yMDYtMC40ODEsMC42NjYtMC4yNzQsMS4wMjNsMC44NDUsMS40NjNIMC43NSAgIGMtMC40MTQsMC0wLjc1LDAuMzM2LTAuNzUsMC43NXMwLjMzNiwwLjc1LDAuNzUsMC43NWgzLjA5bC0wLjg0NSwxLjQ2NWMtMC4yMDcsMC4zNTktMC4wODMsMC44MTcsMC4yNzUsMS4wMjIgICBjMC4xMTgsMC4wNjgsMC4yNDcsMC4xMDMsMC4zNzQsMC4xMDNjMC4yNTksMCwwLjUxMS0wLjEzNSwwLjY1LTAuMzc1bDEuMjc3LTIuMjE1aDIuMTAzbC0yLjUxNiw0LjM1NCAgIGMtMC4yMDcsMC4zNTctMC4wODQsMC44MTYsMC4yNzQsMS4wMjNjMC4xMTgsMC4wNjgsMC4yNDcsMC4xMDIsMC4zNzUsMC4xMDJjMC4yNTksMCwwLjUxMS0wLjEzNiwwLjY1LTAuMzc1bDIuOTQ5LTUuMTA0aDIuMDI0ICAgYzAuMjEzLDEuOTE4LDEuMjM0LDMuNTkxLDIuNzEyLDQuNjg1bC0xLjAxNywxLjc2Mkg3LjIzMmMtMC40MTQsMC0wLjc1LDAuMzM2LTAuNzUsMC43NXMwLjMzNiwwLjc1LDAuNzUsMC43NWg1LjAyNmwtMS4wNSwxLjgxOCAgIEg4LjY1MWMtMC40MTQsMC0wLjc1LDAuMzM2LTAuNzUsMC43NWMwLDAuNDEzLDAuMzM2LDAuNzUsMC43NSwwLjc1aDEuNjlsLTEuNTQ1LDIuNjc2Yy0wLjIwNywwLjM1Ny0wLjA4NCwwLjgxNiwwLjI3NCwxLjAyMyAgIGMwLjExOCwwLjA2OCwwLjI0NywwLjEwMiwwLjM3NSwwLjEwMmMwLjI1OSwwLDAuNTExLTAuMTM1LDAuNjUtMC4zNzVsMS41NDYtMi42NzZsMC44NDYsMS40NjVjMC4xMzksMC4yMzgsMC4zOTEsMC4zNzUsMC42NSwwLjM3NSAgIGMwLjEyNywwLDAuMjU2LTAuMDMzLDAuMzc1LTAuMTAzYzAuMzU5LTAuMjA3LDAuNDgxLTAuNjY2LDAuMjc0LTEuMDIybC0xLjI3OS0yLjIxNWwxLjA1LTEuODJsMi41MTUsNC4zNTQgICBjMC4xMzksMC4yNCwwLjM5MSwwLjM3NSwwLjY1LDAuMzc1YzAuMTI3LDAsMC4yNTYtMC4wMywwLjM3NS0wLjEwMmMwLjM1OS0wLjIwNiwwLjQ4MS0wLjY2NSwwLjI3NC0xLjAyM2wtMi45NDctNS4xMDRsMS4wMTMtMS43NTYgICBjMC44MywwLjM2NCwxLjc0NCwwLjU2OSwyLjcwNywwLjU2OXMxLjg3Ny0wLjIwNSwyLjcwOC0wLjU2OWwxLjAxNCwxLjc1NmwtMi45NDcsNS4xMDRjLTAuMjA3LDAuMzU4LTAuMDg0LDAuODE3LDAuMjczLDEuMDIzICAgYzAuMTE4LDAuMDY3LDAuMjQ3LDAuMTAyLDAuMzc1LDAuMTAyYzAuMjYsMCwwLjUxMi0wLjEzNSwwLjY1LTAuMzc1bDIuNTE1LTQuMzU0bDEuMDUzLDEuODJsLTEuMjc3LDIuMjEzICAgYy0wLjIwNywwLjM1OC0wLjA4NCwwLjgxNiwwLjI3MywxLjAyM2MwLjExNywwLjA2NiwwLjI0NiwwLjEwMiwwLjM3NSwwLjEwMmMwLjI2LDAsMC41MTItMC4xMzYsMC42NS0wLjM3NWwwLjg0NC0xLjQ2MyAgIGwxLjU0NSwyLjY3OGMwLjE0MSwwLjI0LDAuMzkzLDAuMzc1LDAuNjUsMC4zNzVjMC4xMjcsMCwwLjI1Ni0wLjAzMiwwLjM3NS0wLjEwM2MwLjM1OC0wLjIwNywwLjQ4LTAuNjY2LDAuMjc0LTEuMDIybC0xLjU0OC0yLjY3OCAgIGgxLjY4OWMwLjQxNCwwLDAuNzUtMC4zMzgsMC43NS0wLjc1YzAtMC40MTQtMC4zMzYtMC43NS0wLjc1LTAuNzVoLTIuNTU3bC0xLjA1MS0xLjgybDUuMDI5LDAuMDAyYzAuNDE0LDAsMC43NS0wLjMzNiwwLjc1LTAuNzUgICBzLTAuMzM2LTAuNzUtMC43NS0wLjc1bC01Ljg5Ni0wLjAwMmwtMS4wMTktMS43NmMxLjQ3OS0xLjA5NCwyLjUtMi43NjcsMi43MTEtNC42ODVoMi4wMjNsMi45NDcsNS4xMDQgICBjMC4xMzksMC4yMzksMC4zOTEsMC4zNzUsMC42NSwwLjM3NWMwLjEyNywwLDAuMjU2LTAuMDMyLDAuMzc1LTAuMTAyYzAuMzU4LTAuMjA3LDAuNDc5LTAuNjY2LDAuMjcyLTEuMDIzbC0yLjUxNS00LjM1NGgyLjEwNCAgIGwxLjI3OSwyLjIxNWMwLjEzOSwwLjI0LDAuMzkxLDAuMzc1LDAuNjQ5LDAuMzc1YzAuMTI3LDAsMC4yNTYtMC4wMywwLjM3NS0wLjEwM2MwLjM1Ny0wLjIwNSwwLjQ4LTAuNjY1LDAuMjczLTEuMDIybC0wLjg0OC0xLjQ2NSAgIGgzLjA5MmMwLjQxNCwwLDAuNzUtMC4zMzUsMC43NS0wLjc1UzM1Ljk0NSwxNy4zOTEsMzUuNTMxLDE3LjM5MXogTTIzLjM5NSwxOC4xNDFjMCwwLjI1Ny0wLjA0MSwwLjUwMi0wLjA3NiwwLjc1ICAgYy0wLjE5NywxLjM2LTAuOTExLDIuNTQ0LTEuOTQzLDMuMzU4Yy0wLjM5MywwLjMxMi0wLjgxOCwwLjU3NC0xLjI5MSwwLjc2NmMtMC42MDQsMC4yNDItMS4yNTksMC4zODQtMS45NDksMC4zODQgICBjLTAuNjksMC0xLjM0NC0wLjE0Mi0xLjk0OC0wLjM4NGMtMC40NzEtMC4xODgtMC44OTgtMC40NTQtMS4yOTEtMC43NjZjLTEuMDMyLTAuODEzLTEuNzQ2LTEuOTk4LTEuOTQzLTMuMzU4ICAgYy0wLjAzNi0wLjI0Ny0wLjA3Ni0wLjQ5My0wLjA3Ni0wLjc1czAuMDQtMC41MDMsMC4wNzYtMC43NWMwLjE5Ny0xLjM2MSwwLjkxMS0yLjU0NSwxLjk0NC0zLjM1OSAgIGMwLjM5My0wLjMxMiwwLjgyLTAuNTc2LDEuMjkxLTAuNzY1YzAuNjA0LTAuMjQyLDEuMjU4LTAuMzg0LDEuOTQ4LTAuMzg0YzAuNjksMCwxLjM0NCwwLjE0MiwxLjk0OCwwLjM4NCAgIGMwLjQ3MSwwLjE4OCwwLjg5OCwwLjQ1NCwxLjI5MSwwLjc2NWMxLjAzMiwwLjgxNCwxLjc0NiwxLjk5OCwxLjk0MywzLjM1OUMyMy4zNTQsMTcuNjM4LDIzLjM5NSwxNy44ODQsMjMuMzk1LDE4LjE0MXoiIGZpbGw9IiMwMDAwMDAiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K' />
  }
})
