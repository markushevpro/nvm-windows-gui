const
    electron = require( 'electron' ),
    { nativeImage } = electron,
    
    Icons = {
        default: nativeImage.createFromDataURL( 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAM7SURBVHgB7Vc9UBNREN53+SFggpmJBTCKxwxCI46MluCQEisbbAVHh3RgKQ2k0dJghT8j9DZ2jFUypLDxh9EKdYYbdIACFA3yc0nuufvInXeBS+4uYbTwm8nk3r73dr/db+/uHQOPSKRbZO4PzAIDheXzyZn4ugIewMAlxtPR6I6/eQw3TpntnPGUlM9PuyXiisBotn2MY2DcFLXxpmgaTz658mUOHMIRgVvZ0wM+YJO4fMDJeiJS5NrI0/6vmepLK4B01vyBBwzYNfACxueq9ceRBHSd6dK23C5AsjUVfk6n4ltbVQncXjgzLElYbg4y1BM2/WEQcK1zDURYXo3rski63cel2WMPTsDK8kAwrQ8l+Mv4Nwnk1gqwNP8L9rc1i13FMdlX3+0d2mNnV7I7R/qqSGB1cR8y9zbh7bMfFnswLMGrh9/gzazVToFpfW69AOWJvJzYEHNqzgUBHe+f52A5u2uxnR9qxoD7wrmOj5ghoa03ZFlbTtQ1gdbehoPMSsGITBvazEEJRIjskRY/bH5SLfZYZwA8E+jBbBvCDDL3N8WY9KQsidjq4l4pyJ4ofdfgCaH1UokY/ZNd7m8CzwQaUPOBiZjI5APKsVYqfdvFkCGDUpKIiKm5otFwS/PbglSk1Q+eCeiOe4Yi8BobUt0uitJfuB4pVWRX/OT+RlH+7qthfNBxbNTvgmz3YLiae2fPgcs3T2ImPsyMi9LT3UAyUJMdlLlRrCN7FwalKkRafEa/1EyAHMfvxiy2jr5GUWqaM2eqk7mEpJ3AeBmNLrQv40ima8qK9I2dC4o+0LHxWcVXPAg7PZQ2sONpnsZm0N5gRBJzui/LLYovpEd9Kx10eWSHkJ70K8epzj+BKPPy+97Yb2o8O186/r+MDAKsKMXxDlLg2MEzDA+sRtzy6QQeyTidjFidj2SYHD4jkjN2RzIzhtNyNOTXxrHhJ6HWuBy2JAbToYKUSsWV6odSMxJpWdZ82hRjcAO8BAf2QiqwOzNxRbFb4+jDJIEHVk5nRseyoM5U7lo/TA4RqdIfVG5s6+TjvpUUOITrj1OShWN/4OVYmaOknc51JWAmctAf/Cwr+EYq6VwJvwELG4EdwLgplAAAAABJRU5ErkJggg==' ),

        loading: nativeImage.createFromDataURL( 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAO6SURBVHgBzVdNTBNREJ63uwhVCpWfBIg0vQg3BOPBA026FxO8yIWz1BDAE3CUC+2Fq+AJ0Fi96sEj8dSFkuBBhBgPEhJpqkEOYEqKVGi7z5lHt7aw3f5QEr+k2bfzZt9888287T4GZWIodMMjA5sCBmGWSPjn1N0wlAEGJWI02OLiVVVTwNlgljnKAWYW3BG/uOMeB0Ac5xleQQP2QYOLEhgPOhxHSt0YDfEhxzkHjkqkJHXO04xzUjAd3IAPSfjLJjC83N7PJPYUg7jyOjF4Nd8b8QK/u413Zn6qmRIKWCBTZ2AeDG4JXedLwLsdeYITw26gchRDgOSOy3VTNIQiwXIlNwGPmlmls4bhkHMKa72NKxYdXBBg/AGwDQzCZk2mw/jTqIHPPWcMhNxMCljWuQBSoKsveps2AGw+zHgsbdbw5x3XvkbjVXXraNeyt21GAZk69wLB02u8G1rZ6wa2Oo4Nh8nVXMermg5+uj5uX65UBYxnFKgsHJTISKhd4zpb0kPfovKK89YRh37GwbRHKk0gDeZhEuAOAno/WO51ycy4v3UCm4u/z9ljP5PCTtdsnBzqwk7PnQXZzdayJLAdioM2vQ9rLw9y7NV2CVaf/YKPgQNT/9huLrFw2k6/kggYoEDZWdG7qOHmFbHwMWb9L9AR2FtkcLmv5jy/uXgIhWBJwN6qwPvJvUyw/a0E3PHWC8lpTKAxEWrtqRGlMXxpTHYiVjYBz5MGDJCCT+lSUEZNqEB1LctkR/ITOvtqhRJf3sTE/RqqR8E70F42AXuLArcf1cPntzHYWT8WGVEZOkSw0zIY8rf1VGMPpDINR/6dBYIXJEDoGqjD2tpEIxly0z2NDVIkP4Hs1IhGQ3bcv1Zo+cIECOpkoygFgWrbhgGpDEvp7u4asIsr2VtRCVKByJCCFSFwpVaCe9PNOTYqA5WA5G/EvjBgkOnsK5w9IfOSGgk5M//4JJ+RaTZ21v+InUGZGT7GfTYMe/61uDbv/q7SyFQjWtBMvuxF8vmIuValKD9CUSW4TPw/BBjnXvqyhUsHfpAkZW8m7tnpx8vOcXyZjuGMCyoaFz/bme6dc//Qss2mf9WjQZdLl3UfY/AQLhqXQxR19i/0RmbM5i3PBUSEKzxARx0oC/qsLan4ZtRwNJ9HUQeT0eX2QX56DnRBUeCanpQnnqvhjUKeJZ0NR0NOH/WH6dFMxDWvsxVK2oZz7ohPSko9WNfXOXGxzkjKb0tJPaUEJ5R8OjYg+kPWg5iCZktIE1Z1tsJf0k+tJ0FQoNYAAAAASUVORK5CYII=' ),

        on: nativeImage.createFromDataURL( 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAO6SURBVHgBzVdNTBNREJ63uwhVCpWfBIg0vQg3BOPBA026FxO8yIWz1BDAE3CUC+2Fq+AJ0Fi96sEj8dSFkuBBhBgPEhJpqkEOYEqKVGi7z5lHt7aw3f5QEr+k2bfzZt9888287T4GZWIodMMjA5sCBmGWSPjn1N0wlAEGJWI02OLiVVVTwNlgljnKAWYW3BG/uOMeB0Ac5xleQQP2QYOLEhgPOhxHSt0YDfEhxzkHjkqkJHXO04xzUjAd3IAPSfjLJjC83N7PJPYUg7jyOjF4Nd8b8QK/u413Zn6qmRIKWCBTZ2AeDG4JXedLwLsdeYITw26gchRDgOSOy3VTNIQiwXIlNwGPmlmls4bhkHMKa72NKxYdXBBg/AGwDQzCZk2mw/jTqIHPPWcMhNxMCljWuQBSoKsveps2AGw+zHgsbdbw5x3XvkbjVXXraNeyt21GAZk69wLB02u8G1rZ6wa2Oo4Nh8nVXMermg5+uj5uX65UBYxnFKgsHJTISKhd4zpb0kPfovKK89YRh37GwbRHKk0gDeZhEuAOAno/WO51ycy4v3UCm4u/z9ljP5PCTtdsnBzqwk7PnQXZzdayJLAdioM2vQ9rLw9y7NV2CVaf/YKPgQNT/9huLrFw2k6/kggYoEDZWdG7qOHmFbHwMWb9L9AR2FtkcLmv5jy/uXgIhWBJwN6qwPvJvUyw/a0E3PHWC8lpTKAxEWrtqRGlMXxpTHYiVjYBz5MGDJCCT+lSUEZNqEB1LctkR/ITOvtqhRJf3sTE/RqqR8E70F42AXuLArcf1cPntzHYWT8WGVEZOkSw0zIY8rf1VGMPpDINR/6dBYIXJEDoGqjD2tpEIxly0z2NDVIkP4Hs1IhGQ3bcv1Zo+cIECOpkoygFgWrbhgGpDEvp7u4asIsr2VtRCVKByJCCFSFwpVaCe9PNOTYqA5WA5G/EvjBgkOnsK5w9IfOSGgk5M//4JJ+RaTZ21v+InUGZGT7GfTYMe/61uDbv/q7SyFQjWtBMvuxF8vmIuValKD9CUSW4TPw/BBjnXvqyhUsHfpAkZW8m7tnpx8vOcXyZjuGMCyoaFz/bme6dc//Qss2mf9WjQZdLl3UfY/AQLhqXQxR19i/0RmbM5i3PBUSEKzxARx0oC/qsLan4ZtRwNJ9HUQeT0eX2QX56DnRBUeCanpQnnqvhjUKeJZ0NR0NOH/WH6dFMxDWvsxVK2oZz7ohPSko9WNfXOXGxzkjKb0tJPaUEJ5R8OjYg+kPWg5iCZktIE1Z1tsJf0k+tJ0FQoNYAAAAASUVORK5CYII=' ),

        off: nativeImage.createFromDataURL( 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAOjSURBVHgBzVdNTBNREJ63bflRik3AhBIpJUG5oIJcaaQngyc86FVAA3gCr3hoe8EjoBfEROHsQW+GUxtq9KKh0ZM/iSsxlEMrGEqhP+5zZrvdwrrb3RZI/JLNvp03++abb2Z33zKoEhPhFi93OAIcWI+Qy95Y8G+KUAUYVIipsMuVtjdO0hBvdpVW4ksslwsREV6wD+HhxSOGfq+M1rNDBRhbbRvaE9gs4/LCh8HZcN5uX+aFq7ASvDCFJPDkRyLb2tssKXA3em7ABiyA7gNGPhRk0bfei+fneDms4xLCYEGtsawCJPeerTFAQzABqvJDGfYYuOjaDQmMRT2BtLbO1rBtYN/SMwpaA8k9/sbzneSqKDiDq6QYjpYNPOaVeX0C9FiNR9vCNhDCoNdk5nClHc4Akl7CcQgPUbGTIiNoj+05nLOU3B1s5hJvBePRduxcPgBHBDZhEJsxpIy9GEBUe4mVeumJb52dCAEorCryP7DMGRcFAS5zfES15SwSqOg9YBlYQiYAloPJMpR71gU94048D59f78pnLci+sbb/j12Mpg3tdE8mJYF1Apt5iMwkIfIwqUMgBSvTCdASJhsF0rPTWsmvObBMoIiNtQx8erGjXmd2JOjor4csZkNzql+sMO4abDh8fywDZihLwNlig/fPfquliMf2oet6IQhJWwSpQr6tvbWYaVa1f8B7nS326gn0jbrA6bbByoOEEmgXahoEcGOgotxELo5qeH2n5B54+7jwwqMxlbJv9AxUTYBwbeYspOI5ePdoS24kkp6kLpahKPPFW04lcEb2+4IESRFS5kgESMIrmMVH7IVf2EgkfYevHmobmNLhKWjudMh+rb11sp3IkkIXBk+bLW9OgHDpZqMsO2WW/JaVy9COklMQkr9byZ7Qjb5kp8y1TVk1AYJ/uknOroguzC6rPNuUuUpWIeM+YCsH3VcxLZzAbm46X4NBSxwTmD1+92V70Yfm6fogqDFrnII8Z7RW2VcxSdyqk0FzZ42pD8HptlvyI1guwUnh/yHA8myEc8PdzHECt+mSX42rnZ1YbRvmtANmVe2KDIHJbWO6ocX+9bmDdsNP9b1VzxQ+ZJPHQ0Sar8/bg3N+sbL/gomw1yvZpCBjcBuqAo9Iedv9p34xZuRh6ceEiHC79BKM9/yauCAyJo0s+H5GzFwr+jc06w+qs8Bgvi4vzOnJfWQCKpGoJ4gvxMBhq3Gdj52ATELtD97OgIesyK2Hv5fkl3aooTRPAAAAAElFTkSuQmCC' ),
    }

module.exports = Icons