//
//  UIImage+Addition.m
//  FFProject
//
//  Created by junming on 9/3/15.
//  Copyright (c) 2015 pingan. All rights reserved.
//

#import "UIImage+Addition.h"

@implementation UIImage (Addition)

+ (UIImage *)resizableImageNamed:(NSString *)imageName
{
    return [[UIImage imageNamed:imageName] resizableImageInCenter];
}

- (UIImage *) resizableImageInCenter
{
    float left = (self.size.width)/2;//The middle points rarely vary anyway
    float top = (self.size.height)/2;
    
    if ([self respondsToSelector:@selector(resizableImageWithCapInsets:)])
    {
        return [self resizableImageWithCapInsets:UIEdgeInsetsMake(top, left, top, left)];
    }
    else
    {
        return [self stretchableImageWithLeftCapWidth:left topCapHeight:top];
    }
}

+ (UIImage *)compressImage:(UIImage *)image
        compressionQuality:(CGFloat)compressionQuality{
    if (!image) {
        return nil;
    }
    
    CGFloat widthScale = [[UIScreen mainScreen] bounds].size.width * [UIScreen mainScreen].scale / image.size.width;
    CGFloat heightScale = [[UIScreen mainScreen] bounds].size.height * [UIScreen mainScreen].scale / image.size.height;
    CGFloat scale = MIN(widthScale, heightScale);
    UIImage *scaledImage = nil;
    if (scale > 1) {
        scaledImage = image;
    } else {
        CGSize scaledSize = CGSizeMake(image.size.width * scale, image.size.height * scale);
        UIGraphicsBeginImageContext(scaledSize);
        [image drawInRect:CGRectMake(0, 0, scaledSize.width, scaledSize.height)];
        scaledImage = UIGraphicsGetImageFromCurrentImageContext();
        UIGraphicsEndImageContext();
    }
    
    NSData * imageData = UIImageJPEGRepresentation(scaledImage, compressionQuality);
    
    return [UIImage imageWithData:imageData];
}

+ (void)compressImage:(UIImage *)image
              imageKB:(CGFloat)fImageKBytes
           imageBlock:(void(^)(UIImage *image))block {
    
    __block UIImage *imageCope = image;
    CGFloat fImageBytes = fImageKBytes * 1024;//需要压缩的字节Byte
    
    __block NSData *uploadImageData = nil;
    
    uploadImageData = UIImagePNGRepresentation(imageCope);
    NSLog(@"图片压前缩成 %fKB",uploadImageData.length/1024.0);
    CGSize size = imageCope.size;
    CGFloat imageWidth = size.width;
    CGFloat imageHeight = size.height;
    
    if (uploadImageData.length > fImageBytes && fImageBytes >0) {
        
        dispatch_async(dispatch_queue_create("CompressedImage", DISPATCH_QUEUE_SERIAL), ^{
            
            /* 宽高的比例 **/
            CGFloat ratioOfWH = imageWidth/imageHeight;
            /* 压缩率 **/
            CGFloat compressionRatio = fImageBytes/uploadImageData.length;
            /* 宽度或者高度的压缩率 **/
            CGFloat widthOrHeightCompressionRatio = sqrt(compressionRatio);
            
            CGFloat dWidth   = imageWidth *widthOrHeightCompressionRatio;
            CGFloat dHeight  = imageHeight*widthOrHeightCompressionRatio;
            if (ratioOfWH >0) { /* 宽 > 高,说明宽度的压缩相对来说更大些 **/
                dHeight = dWidth/ratioOfWH;
            }else {
                dWidth  = dHeight*ratioOfWH;
            }
            
            imageCope = [self drawWithWithImage:imageCope width:dWidth height:dHeight];
            uploadImageData = UIImagePNGRepresentation(imageCope);
            
            //微调
            NSInteger compressCount = 0;
            /* 控制在 1M 以内**/
            while (fabs(uploadImageData.length - fImageBytes) > 1024) {
                /* 再次压缩的比例**/
                CGFloat nextCompressionRatio = 0.9;
                
                if (uploadImageData.length > fImageBytes) {
                    dWidth = dWidth*nextCompressionRatio;
                    dHeight= dHeight*nextCompressionRatio;
                }else {
                    dWidth = dWidth/nextCompressionRatio;
                    dHeight= dHeight/nextCompressionRatio;
                }
                
                imageCope = [self drawWithWithImage:imageCope width:dWidth height:dHeight];
                uploadImageData = UIImagePNGRepresentation(imageCope);
                
                /*防止进入死循环**/
                compressCount ++;
                if (compressCount == 10) {
                    break;
                }
                
            }
            
            NSLog(@"图片已经压缩成 %fKB",uploadImageData.length/1024.0);
            imageCope = [[UIImage alloc] initWithData:uploadImageData];
            
            dispatch_sync(dispatch_get_main_queue(), ^{
                block(imageCope);
            });
        });
    }
    else
    {
        block(imageCope);
    }
}

+ (void)compressImage:(UIImage *)image
       compressedSize:(CGFloat)compressedSize
           imageBlock:(void (^)(UIImage *))block
{
    
    CGFloat originalSize = image.size.width * image.size.height ;
    NSLog(@"图片压缩前 %@ * %@",@(image.size.width * image.scale),@(image.size.height * image.scale));
    
    
    if (originalSize*image.scale*image.scale > compressedSize && compressedSize >0) {
        
        dispatch_async(dispatch_queue_create("CompressedImage", DISPATCH_QUEUE_SERIAL), ^{
            CGFloat imageWidth = image.size.width;
            CGFloat imageHeight = image.size.height;
            /* 宽高的比例 **/
            CGFloat ratioOfWH = imageWidth/imageHeight;
            /* 压缩率 **/
            CGFloat compressionRatio = compressedSize/originalSize;
            /* 宽度或者高度的压缩率 **/
            CGFloat widthOrHeightCompressionRatio = sqrt(compressionRatio);
            
            CGFloat dWidth   = imageWidth *widthOrHeightCompressionRatio;
            CGFloat dHeight  = imageHeight*widthOrHeightCompressionRatio;
            if (ratioOfWH >0) { /* 宽 > 高,说明宽度的压缩相对来说更大些 **/
                dHeight = dWidth/ratioOfWH;
            }else {
                dWidth  = dHeight*ratioOfWH;
            }
            
            UIImage *editedImage = [self drawWithWithImage:image width:dWidth height:dHeight];
            
            NSLog(@"图片已经压缩成 %@ * %@",@(image.size.width * image.scale),@(image.size.height * image.scale));
            
            dispatch_sync(dispatch_get_main_queue(), ^{
                block(editedImage);
            });
        });
    }
    else
    {
        block(image);
    }
}

/* 根据 dWidth dHeight 返回一个新的image**/
+ (UIImage *)drawWithWithImage:(UIImage *)imageCope
                         width:(CGFloat)dWidth
                        height:(CGFloat)dHeight{
    UIGraphicsBeginImageContext(CGSizeMake(dWidth, dHeight));
    [imageCope drawInRect:CGRectMake(0, 0, dWidth, dHeight)];
    imageCope = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();
    
    return imageCope;
    
}

@end
