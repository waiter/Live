//
//  NativeManager.m
//  Project
//
//  Created by Song Wt on 16/10/3.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "NativeManager.h"
#import "KTPlay.h"


@implementation NativeManager


RCT_EXPORT_METHOD(share:(NSInteger *)type title:(NSString *)title text:(NSString *)text url:(NSString*) url)
{

}

RCT_EXPORT_METHOD(isInstall:(NSInteger *)type callback:(RCTResponseSenderBlock)callback)
{
  
}

RCT_EXPORT_METHOD(isKtplayEnable:(RCTResponseSenderBlock)callback)
{
  callback([KTPlay isEnabled] ? @[@1] : @[@0]);
}

RCT_EXPORT_METHOD(showKtplay:(NSInteger *)type)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    [KTPlay show];
  });
}


RCT_EXPORT_MODULE();

@end
