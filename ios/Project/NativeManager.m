//
//  NativeManager.m
//  Project
//
//  Created by Song Wt on 16/10/3.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "NativeManager.h"

@implementation NativeManager


RCT_EXPORT_METHOD(share:(NSString *)name location:(NSString *)location)
{
  NSLog(@"Pretending to create an event %@ at %@", name, location);
  [[NSNotificationCenter defaultCenter] postNotificationName:@"shareApp" object:nil];
}

RCT_EXPORT_MODULE();

@end
