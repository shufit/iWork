//
//  XAppModuleConfig.m
//  RNProject
//
//  Created by ShiXiaoHui on 3/4/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "XAppModuleConfig.h"

@implementation XAppModuleConfig

- (instancetype)init {
  self = [super init];
  if (self) {
    self.moduleName = @"";
    self.isEnable = NO;
  }
  return self;
}

- (id)initWithDic:(NSDictionary *)dic {
  self = [self init];
  if (self && dic) {
    self.moduleName = [dic objectForKey:@"moduleName"];
    self.isEnable = ![[dic objectForKey:@"enable"] isEqualToString:@"false"];
    NSArray *services = [dic objectForKey:@"service"];
    if ([services isKindOfClass:[NSArray class]] && [services count] > 0) {
      NSMutableArray *unservices = [NSMutableArray arrayWithCapacity:[services count]];
      NSMutableArray *avilables = [NSMutableArray arrayWithCapacity:[services count]];
      for (NSDictionary *service in services) {
        NSString *serviceId = [service objectForKey:@"serviceId"];
        BOOL enable = ![[service objectForKey:@"enable"] isEqualToString:@"false"];
        if (!enable) {
          [unservices addObject:serviceId];
        }
        [avilables addObject:serviceId];
      }
      
      self.unAvailableServiceList = unservices;
      self.serviceList = avilables;
    }
    
  }
  return self;
}

- (BOOL)isServiceAvilible:(NSString *)serviceId defaultValue:(BOOL)defaultValue {
  if([self.unAvailableServiceList count] > 0 && [self.unAvailableServiceList containsObject:serviceId]) {
    return NO;
  }
  
  if ([self.serviceList count] > 0 && [self.serviceList containsObject:serviceId]) {
    return YES;
  }
  
  return defaultValue;
}

- (BOOL)isServiceAvilible:(NSString *)serviceId {
  return [self isServiceAvilible:serviceId defaultValue:NO];
}

@end
