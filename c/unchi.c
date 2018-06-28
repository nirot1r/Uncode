#include <stdio.h>

void main() {
    int i = 0, h = 0, m = 0, s = 0;

    printf("秒数 >> ");
    scanf("%d", &i);

    // h = i / (60 * 60);
    // m = i % (60 * 60);
    // m = h / 60;
    // s = m % 60;

    h = i / (60 * 60);
    printf("   1 : h = %5d, m = %5d, s = %5d\n", h, m, s);
    m = i % (60 * 60);
    printf("   2 : h = %5d, m = %5d, s = %5d\n", h, m, s);
    s = m % 60;
    printf("   3 : h = %5d, m = %5d, s = %5d\n", h, m, s);
    m = m / 60;
    printf("   4 : h = %5d, m = %5d, s = %5d\n", h, m, s);

    printf(" Ans.: %d時間%d分%d秒\n", h, m, s);
}
