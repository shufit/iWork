//
//  UIImage+Addition.h
//  FFProject
//
//  Created by junming on 9/3/15.
//  Copyright (c) 2015 pingan. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

@interface UIImage (Addition)

//图片拉伸
+ (UIImage *)resizableImageNamed:(NSString *)imageName;

- (UIImage *)resizableImageInCenter;

/**
 *  压缩图片
 *
 *  @param image              压缩前图片
 *  @param compressionQuality 压缩的级别
 *
 *  @return 压缩后图片
 */
+ (UIImage *)compressImage:(UIImage *)image
        compressionQuality:(CGFloat)compressionQuality;

/**
 *  压缩图片
 *
 *  @param image       需要压缩的图片
 *  @param fImageBytes 希望压缩后的大小(以KB为单位)
 *
 *  @return 压缩后的图片
 */
+ (void)compressImage:(UIImage *)image
              imageKB:(CGFloat)fImageKBytes
           imageBlock:(void(^)(UIImage *image))block;

/**
 压缩图片 根据图片size确定压缩后的值。大图片推荐使用这个方法减少占用内存
 
 @param image 需要压缩的图片
 @param compressedSize 希望压缩后的大小（图片像素宽*高）
 @param block 压缩完成后回调
 */
+ (void)compressImage:(UIImage *)image
       compressedSize:(CGFloat)compressedSize
           imageBlock:(void (^)(UIImage *))block;
@end
