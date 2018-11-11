#include <stdio.h>
#include "project3.h"

extern int TraceLevel;

struct distance_table dt0;
struct NeighborCosts   *neighbor0;
int adjacentNodes0[MAX_NODES];

void rtinit0() {
    rtinit(0, &dt0, &neighbor0, adjacentNodes0);
}
void rtupdate0( struct RoutePacket *rcvdpkt ) {
    rtupdate(0, &dt0, &neighbor0, adjacentNodes0, rcvdpkt);
}

void printdt0( int MyNodeNumber, struct NeighborCosts *neighbor,
		struct distance_table *dtptr ) {
	printdt(MyNodeNumber, neighbor, dtptr);
}
